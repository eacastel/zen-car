import crypto from "node:crypto"

const NONCE_TTL_MS = 5 * 60 * 1000

const toBase64Url = input =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")

const fromBase64Url = input => {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64 + "=".repeat((4 - (base64.length % 4 || 4)) % 4)
  return Buffer.from(padded, "base64").toString("utf8")
}

const hashValue = (value, secret) =>
  crypto
    .createHmac("sha256", secret)
    .update(String(value || ""))
    .digest("hex")

const sign = (payloadB64, secret) =>
  toBase64Url(crypto.createHmac("sha256", secret).update(payloadB64).digest())

const safeEqual = (a, b) => {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  if (left.length !== right.length) return false
  return crypto.timingSafeEqual(left, right)
}

export const getNonceSecret = () =>
  process.env.BOOKING_NONCE_SECRET || process.env.TURNSTILE_SECRET_KEY || ""

export const getClientIp = event =>
  event.headers["x-nf-client-connection-ip"] ||
  event.headers["client-ip"] ||
  event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
  "unknown"

export const getClientUserAgent = event => event.headers["user-agent"] || ""

export const issueBookingNonce = ({ ip, userAgent, secret }) => {
  const issuedAt = Date.now()
  const payload = {
    v: 1,
    nonceId: crypto.randomBytes(16).toString("hex"),
    iat: issuedAt,
    exp: issuedAt + NONCE_TTL_MS,
    ipHash: hashValue(ip, secret),
    uaHash: hashValue(userAgent, secret),
  }
  const payloadB64 = toBase64Url(JSON.stringify(payload))
  const signature = sign(payloadB64, secret)
  return `${payloadB64}.${signature}`
}

export const verifyBookingNonce = ({ nonceToken, ip, userAgent, secret }) => {
  if (!nonceToken || typeof nonceToken !== "string") {
    return { ok: false, reason: "missing_nonce" }
  }

  const [payloadB64, signature] = nonceToken.split(".")
  if (!payloadB64 || !signature) {
    return { ok: false, reason: "invalid_format" }
  }

  const expectedSignature = sign(payloadB64, secret)
  if (!safeEqual(signature, expectedSignature)) {
    return { ok: false, reason: "invalid_signature" }
  }

  let payload
  try {
    payload = JSON.parse(fromBase64Url(payloadB64))
  } catch {
    return { ok: false, reason: "invalid_payload" }
  }

  if (!payload?.nonceId || !payload?.exp || Date.now() > payload.exp) {
    return { ok: false, reason: "expired" }
  }

  if (payload.ipHash !== hashValue(ip, secret)) {
    return { ok: false, reason: "ip_mismatch" }
  }

  if (payload.uaHash !== hashValue(userAgent, secret)) {
    return { ok: false, reason: "ua_mismatch" }
  }

  return { ok: true, nonceId: payload.nonceId, exp: payload.exp }
}
