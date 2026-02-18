// netlify/functions/get-calendly-link.js
const ALLOWED_HOSTS = new Set([
  "zencarbuying.com",
  "www.zencarbuying.com",
  "localhost",
  "127.0.0.1",
])
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 8 // max secure-link requests per window per IP
const RECENT_REQUESTS_BY_IP = new Map()

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

const getClientIp = event =>
  event.headers["x-nf-client-connection-ip"] ||
  event.headers["client-ip"] ||
  event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
  "unknown"

const isRateLimited = ip => {
  const now = Date.now()

  // Opportunistic cleanup to keep memory bounded in warm instances.
  for (const [knownIp, timestamps] of RECENT_REQUESTS_BY_IP.entries()) {
    const active = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS)
    if (active.length === 0) {
      RECENT_REQUESTS_BY_IP.delete(knownIp)
    } else {
      RECENT_REQUESTS_BY_IP.set(knownIp, active)
    }
  }

  const timestamps = RECENT_REQUESTS_BY_IP.get(ip) || []
  const active = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS)

  if (active.length >= RATE_LIMIT_MAX_REQUESTS) {
    RECENT_REQUESTS_BY_IP.set(ip, active)
    return true
  }

  active.push(now)
  RECENT_REQUESTS_BY_IP.set(ip, active)
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

  // 1. Parse the body to get the token
  let token
  try {
    const body = JSON.parse(event.body || "{}")
    token = body.token
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" }
  }

  if (!token) {
    return { statusCode: 403, body: "Missing Human Token" }
  }

  // 2. Verify the token with Cloudflare
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY
  if (!SECRET_KEY) {
    return { statusCode: 500, body: "Missing Turnstile Config" }
  }

  const ip = getClientIp(event)
  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers: { "Retry-After": "600" },
      body: "Rate limit exceeded. Try again shortly.",
    }
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
    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.resource.booking_url }),
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  }
}
