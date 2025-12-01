// netlify/functions/get-calendly-link.js

// Node 18/20 has built-in fetch, so we don't need to import it!

export const handler = async (event, context) => {
  // 1. Security Check
  const referer = event.headers.referer || "";
  const allowed = ["zencarbuying", "localhost", "127.0.0.1"];
  
  // Optional: If you want strict blocking, uncomment the lines below.
  // if (!allowed.some((domain) => referer.includes(domain))) {
  //   return { statusCode: 403, body: "Forbidden" };
  // }

  // 2. Get Secrets
  const TOKEN = process.env.CALENDLY_API_TOKEN;
  const UUID = process.env.CALENDLY_EVENT_UUID;

  if (!TOKEN || !UUID) {
    console.error("Missing Calendly Env Vars");
    return { statusCode: 500, body: "Server Error: Missing Config" };
  }

  try {
    // 3. Ask Calendly for a Single-Use Link
    const response = await fetch("https://api.calendly.com/scheduling_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        max_event_count: 1, // Link expires after 1 use
        owner: `https://api.calendly.com/event_types/${UUID}`,
        owner_type: "EventType",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Calendly API Error:", errorText);
      throw new Error(`Calendly API error: ${response.status}`);
    }

    const data = await response.json();

    // 4. Return the new URL
    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.resource.booking_url }),
    };

  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};