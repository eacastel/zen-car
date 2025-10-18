// src/components/home-b/StickyMobileCTA.js
import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
      <div className="mx-4 mb-4 rounded-xl shadow-lg overflow-hidden bg-white border border-gray-200">
        <div className="flex">
          <Link
            to="/#book-call"
            className="w-1/2 px-4 py-3 text-center text-sm font-semibold border-r border-gray-200"
            onClick={() =>
              typeof window !== "undefined" &&
              window.dataLayer?.push({
                event: "cta_click",
                cta_action: "book_consult",
                cta_label: "StickyMobile",
                cta_location: "bottom_bar",
              })
            }
          >
            Free 15-min Call
          </Link>
          <Link
            to="/#start-concierge"
            className="w-1/2 px-4 py-3 text-center text-sm font-semibold bg-[#F99F1B] text-black"
            onClick={() =>
              typeof window !== "undefined" &&
              window.dataLayer?.push({
                event: "cta_click",
                cta_action: "purchase_start",
                cta_label: "StickyMobile",
                cta_location: "bottom_bar",
              })
            }
          >
            Start Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
