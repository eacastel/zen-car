// netlify/functions/get-calendly-link.js
export const handler = async (event) => {
  // 1. Parse the body to get the token
  let token;
  try {
    const body = JSON.parse(event.body || "{}");
    token = body.token;
  } catch (e) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  if (!token) {
    return { statusCode: 403, body: "Missing Human Token" };
  }

  // 2. Verify the token with Cloudflare
  const SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"];

  const formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, { body: formData, method: "POST" });
  const outcome = await result.json();

  if (!outcome.success) {
    console.error("Bot detected:", outcome["error-codes"]);
    return { statusCode: 403, body: "Bot detected" };
  }


  const CALENDLY_TOKEN = process.env.CALENDLY_API_TOKEN;
  const EVENT_UUID = process.env.CALENDLY_EVENT_UUID;

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
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.resource.booking_url }),
    };

  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};