// src/utils/openCalendly.js
export const openCalendlyPopup = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    if (window.__CALENDLY_POPUP_OPEN__) {
      return; // Prevent reopening if already open
    }

    window.Calendly.initPopupWidget({
      url: "https://calendly.com/zencarbuying/15-minute-consultation-with-a-zen-guide?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f99f1b&text_color=6b8385&background_color=eaf3f3",
    });
    window.__CALENDLY_POPUP_OPEN__ = true;

    // Adjust styles for improved mobile UX
    setTimeout(() => {
      const calendlyPopup = document.querySelector(".calendly-popup");
      if (calendlyPopup) {
        calendlyPopup.style.width = "100vw";
        calendlyPopup.style.height = "100vh";
        calendlyPopup.style.maxHeight = "100vh";
        calendlyPopup.style.overflow = "auto";  // Enable scrolling


        calendlyPopup.setAttribute("role", "dialog");
        calendlyPopup.setAttribute("aria-modal", "true");
        calendlyPopup.setAttribute("aria-label", "Schedule a Consultation");

        // Ensure focus remains on the Calendly popup for accessibility
        calendlyPopup.focus();
      }

      const overlay = document.querySelector(".calendly-overlay");
      if (overlay) {
        overlay.addEventListener("click", () => {
          window.Calendly.closePopupWidget();
          window.__CALENDLY_POPUP_OPEN__ = false;
        });
      }

      // Prevent body scrolling while Calendly is open
      document.body.style.overflow = "hidden";

      // Restore scrolling when Calendly closes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.removedNodes.length &&
            Array.from(mutation.removedNodes).some((node) =>
              node.classList?.contains("calendly-popup")
            )
          ) {
            document.body.style.overflow = ""; // Restore scrolling
            window.__CALENDLY_POPUP_OPEN__ = false;
          }
        });
      });

      observer.observe(document.body, { childList: true });
    }, 500);
  } else {
    console.error("Calendly is not loaded.");
  }
};
