import {
  getClientIp,
  getClientUserAgent,
  getNonceSecret,
  issueBookingNonce,
} from "./_bookingNonce.js"

const ALLOWED_HOSTS = new Set([
  "zencarbuying.com",
  "www.zencarbuying.com",
  "localhost",
  "127.0.0.1",
])

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

export const handler = async event => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  const originHost = getHostFromHeaderUrl(event.headers.origin || "")
  const refererHost = getHostFromHeaderUrl(event.headers.referer || "")
  if (!(isAllowedHost(originHost) || isAllowedHost(refererHost))) {
    return { statusCode: 403, body: "Forbidden" }
  }

  const nonceSecret = getNonceSecret()
  if (!nonceSecret) {
    return { statusCode: 500, body: "Missing nonce config" }
  }

  const bookingNonce = issueBookingNonce({
    ip: getClientIp(event),
    userAgent: getClientUserAgent(event),
    secret: nonceSecret,
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ bookingNonce }),
  }
}
