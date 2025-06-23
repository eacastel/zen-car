// Only attach the Calendly booking listener once
if (typeof window !== "undefined" && !window.__CALENDLY_BOOKED_LISTENER__) {
  window.addEventListener("message", function (e) {
    try {
      const eventName = e?.data?.event;
      if (eventName === "calendly.event_scheduled") {
        console.log("✅ Calendly booking confirmed!", e.data);

        const email = e?.data?.payload?.invitee?.email;
        const firstName = e?.data?.payload?.invitee?.first_name;
        const lastName = e?.data?.payload?.invitee?.last_name;

        window.dataLayer = window.dataLayer || [];

        // Push enhanced conversion data for Google Ads
        if (email) {
          window.dataLayer.push({
            event: "enhanced_conversion_data",
            user_data: {
              email,
              first_name: firstName || undefined,
              last_name: lastName || undefined,
            },
          });

          if (typeof gtag === "function") {
            gtag("set", "user_data", {
              email: email,
              first_name: firstName || undefined,
              last_name: lastName || undefined,
            });
          }
        }

        // Standard Calendly booking event
        window.dataLayer.push({
          event: "calendly_booked",
          calendly_url: e?.data?.payload?.event?.uri || "",
        });
      } else {
        console.log("📭 Ignored message:", e.data);
      }
    } catch (err) {
      console.warn("📛 Error parsing Calendly event:", err);
    }
  });
  window.__CALENDLY_BOOKED_LISTENER__ = true;
}

export const openCalendlyPopup = async () => {
  if (typeof window === "undefined") return;

  // Load Calendly CSS if it's not already present
  if (!document.querySelector('link[href*="widget.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.type = "text/css";
    link.media = "all";
    document.head.appendChild(link);
  }

  // Load Calendly script if not already loaded
  if (!window.Calendly) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ Calendly script loaded.");
        resolve();
      };
      script.onerror = () => {
        console.error("❌ Failed to load Calendly script.");
        reject();
      };
      document.head.appendChild(script);
    });
  }

  if (window.__CALENDLY_POPUP_OPEN__) return;

  window.Calendly.initPopupWidget({
    url: "https://calendly.com/zencarbuying/15-minute-consultation-with-a-zen-guide?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f99f1b&text_color=6b8385&background_color=eaf3f3",
  });

  if (typeof window.fbq === "function") {
    window.fbq("track", "Schedule");
  }

  window.__CALENDLY_POPUP_OPEN__ = true;

  // UX adjustments
  setTimeout(() => {
    const calendlyPopup = document.querySelector(".calendly-popup");
    if (calendlyPopup) {
      calendlyPopup.style.width = "100vw";
      calendlyPopup.style.height = "100vh";
      calendlyPopup.style.maxHeight = "100vh";
      calendlyPopup.style.overflow = "auto";
      calendlyPopup.setAttribute("role", "dialog");
      calendlyPopup.setAttribute("aria-modal", "true");
      calendlyPopup.setAttribute("aria-label", "Schedule a Consultation");
      calendlyPopup.focus();
    }

    const overlay = document.querySelector(".calendly-overlay");
    if (overlay) {
      overlay.addEventListener("click", () => {
        window.Calendly.closePopupWidget();
        window.__CALENDLY_POPUP_OPEN__ = false;
      });
    }

    document.body.style.overflow = "hidden";

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.removedNodes.length &&
          Array.from(mutation.removedNodes).some((node) =>
            node.classList?.contains("calendly-popup")
          )
        ) {
          document.body.style.overflow = "";
          window.__CALENDLY_POPUP_OPEN__ = false;
        }
      });
    });

    observer.observe(document.body, { childList: true });
  }, 500);
};
