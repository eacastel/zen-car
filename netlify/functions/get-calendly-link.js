// netlify/functions/get-calendly-link.js
import {
  getClientIp,
  getClientUserAgent,
  getNonceSecret,
  verifyBookingNonce,
} from "./_bookingNonce.js"

const ALLOWED_HOSTS = new Set([
  "zencarbuying.com",
  "www.zencarbuying.com",
  "localhost",
  "127.0.0.1",
])
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 8 // max secure-link requests per window per IP
const FALLBACK_WINDOW_MS = 30 * 60 * 1000 // 30 minutes
const FALLBACK_MAX_REQUESTS = 1 // strict fallback when Turnstile token is null
const RECENT_REQUESTS_BY_IP = new Map()
const FALLBACK_REQUESTS_BY_IP = new Map()
const USED_NONCES = new Map()

const getHostFromHeaderUrl = (rawValue = "") => {
  if (!rawValue || typeof rawValue !== "string") return ""
  try {
    return new URL(rawValue).hostname.toLowerCase()
  } catch {
    return ""
  }
}

const isAllowedHost = (host = "") => {
  if (!host) return false
  if (ALLOWED_HOSTS.has(host)) return true
  return host.endsWith(".netlify.app")
}

const isRateLimited = (ip, { windowMs, maxRequests, store }) => {
  const now = Date.now()

  // Opportunistic cleanup to keep memory bounded in warm instances.
  for (const [knownIp, timestamps] of store.entries()) {
    const active = timestamps.filter(ts => now - ts < windowMs)
    if (active.length === 0) {
      store.delete(knownIp)
    } else {
      store.set(knownIp, active)
    }
  }

  const timestamps = store.get(ip) || []
  const active = timestamps.filter(ts => now - ts < windowMs)

  if (active.length >= maxRequests) {
    store.set(ip, active)
    return true
  }

  active.push(now)
  store.set(ip, active)
  return false
}

export const handler = async event => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const originHost = getHostFromHeaderUrl(event.headers.origin || "")
  const refererHost = getHostFromHeaderUrl(event.headers.referer || "")
  if (!(isAllowedHost(originHost) || isAllowedHost(refererHost))) {
    return { statusCode: 403, body: "Forbidden" }
  }

  // 1. Parse body
  let token
  let bookingNonce
  let turnstileStatus
  try {
    const body = JSON.parse(event.body || "{}")
    token = body.token ?? null
    bookingNonce = body.bookingNonce
    turnstileStatus = body.turnstileStatus || "ok"
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" }
  }

  const ip = getClientIp(event)
  const userAgent = getClientUserAgent(event)

  const nonceSecret = getNonceSecret()
  if (!nonceSecret) {
    return { statusCode: 500, body: "Missing nonce config" }
  }

  const nonceResult = verifyBookingNonce({
    nonceToken: bookingNonce,
    ip,
    userAgent,
    secret: nonceSecret,
  })
  if (!nonceResult.ok) {
    return { statusCode: 403, body: "Invalid booking nonce" }
  }

  const now = Date.now()
  for (const [nonceId, exp] of USED_NONCES.entries()) {
    if (exp <= now) USED_NONCES.delete(nonceId)
  }
  if (USED_NONCES.has(nonceResult.nonceId)) {
    return { statusCode: 409, body: "Booking nonce already used" }
  }

  // Baseline rate limiting
  if (
    isRateLimited(ip, {
      windowMs: RATE_LIMIT_WINDOW_MS,
      maxRequests: RATE_LIMIT_MAX_REQUESTS,
      store: RECENT_REQUESTS_BY_IP,
    })
  ) {
    return {
      statusCode: 429,
      headers: { "Retry-After": "600" },
      body: "Rate limit exceeded. Try again shortly.",
    }
  }

  // 2. Verify Turnstile (or strict null-token fallback)
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY
  const isNullTokenFallback = !token && turnstileStatus === "unavailable"
  if (token) {
    if (!SECRET_KEY) {
      return { statusCode: 500, body: "Missing Turnstile Config" }
    }

    const formData = new FormData()
    formData.append("secret", SECRET_KEY)
    formData.append("response", token)
    formData.append("remoteip", ip)

    const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
    const result = await fetch(url, { body: formData, method: "POST" })
    const outcome = await result.json()

    if (!outcome.success) {
      console.error("Bot detected:", outcome["error-codes"])
      return { statusCode: 403, body: "Bot detected" }
    }

    const outcomeHost = (outcome.hostname || "").toLowerCase()
    if (!isAllowedHost(outcomeHost)) {
      return { statusCode: 403, body: "Invalid verification host" }
    }

    if (outcome.action && outcome.action !== "vip_consultation") {
      return { statusCode: 403, body: "Invalid verification action" }
    }
  } else if (isNullTokenFallback) {
    // Failsafe path for Turnstile outage: strict limit, nonce still required.
    if (
      isRateLimited(ip, {
        windowMs: FALLBACK_WINDOW_MS,
        maxRequests: FALLBACK_MAX_REQUESTS,
        store: FALLBACK_REQUESTS_BY_IP,
      })
    ) {
      return {
        statusCode: 429,
        headers: { "Retry-After": "1800" },
        body: "Fallback rate limit exceeded.",
      }
    }
  } else {
    return { statusCode: 403, body: "Missing Human Token" }
  }

  const CALENDLY_TOKEN = process.env.CALENDLY_API_TOKEN
  const EVENT_UUID = process.env.CALENDLY_EVENT_UUID
  if (!CALENDLY_TOKEN || !EVENT_UUID) {
    return { statusCode: 500, body: "Missing Calendly Config" }
  }

  try {
    const response = await fetch("https://api.calendly.com/scheduling_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CALENDLY_TOKEN}`,
      },
      body: JSON.stringify({
        max_event_count: 1,
        owner: `https://api.calendly.com/event_types/${EVENT_UUID}`,
        owner_type: "EventType",
      }),
    })

    const data = await response.json()
    if (!response.ok || !data?.resource?.booking_url) {
      return { statusCode: 502, body: "Calendly scheduling link error" }
    }

    // Burn nonce after successful link generation.
    USED_NONCES.set(nonceResult.nonceId, nonceResult.exp || Date.now() + 60000)

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.resource.booking_url }),
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}
