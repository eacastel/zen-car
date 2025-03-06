// src/utils/openCalendly.js
export const openCalendlyPopup = () => {
    if (typeof window !== "undefined" && window.Calendly) {
      // If the Calendly popup is already open, do nothing (or close it)
      if (window.__CALENDLY_POPUP_OPEN__) {
        return;
      }
  
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/zencarbuying/15-minute-consultation-with-a-zen-guide?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=f99f1b&text_color=6b8385&background_color=eaf3f3",
      });
      window.__CALENDLY_POPUP_OPEN__ = true;
  
      // After a short delay, adjust the overlay styles and attach a close event
      setTimeout(() => {
        const calendlyPopup = document.querySelector(".calendly-popup");
        if (calendlyPopup) {
          calendlyPopup.style.width = "100vw";
          calendlyPopup.style.height = "100vh";
          calendlyPopup.style.maxHeight = "100vh";
          calendlyPopup.style.overflow = "hidden";
          calendlyPopup.setAttribute("role", "dialog");
          calendlyPopup.setAttribute("aria-modal", "true");
          calendlyPopup.setAttribute("aria-label", "Schedule a Consultation");
        }
        const overlay = document.querySelector(".calendly-overlay");
        if (overlay) {
          overlay.addEventListener("click", () => {
            window.Calendly.closePopupWidget();
            window.__CALENDLY_POPUP_OPEN__ = false;
          });
        }
      }, 500);
    } else {
      console.error("Calendly is not loaded.");
    }
  };
  