// netlify/functions/meta-capi.js
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


exports.handler = async function (event) {
  const { eventName, userData, eventId, eventSourceUrl, value, currency, testEventCode } = JSON.parse(event.body);

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_TOKEN;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: {
          value: value || 0,
          currency: currency || "USD",
        },
        ...(testEventCode && { test_event_code: testEventCode }),
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("❌ Meta CAPI Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Meta CAPI failed", details: err.message }),
    };
  }
};
