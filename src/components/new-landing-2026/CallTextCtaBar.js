import React from "react";

export default function CallTextCtaBar() {
  const phoneDisplay = "(888) 651-6088";
  const phoneE164 = "+18886516088";

  const track = (action) => {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cta_contact_click",
      action, // "call" | "text"
      phone: phoneE164,
      page_location: window.location.href,
    });
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-6">
        <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl shadow-sm px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm font-pirulen tracking-wider  uppercase text-accent">
                Questions before you start?
              </div>
              <div className="text-xl md:text-2xl  font-bold text-primary mt-1 capitalize">
                Call or text your Zen Guide:{" "}
                <a
                  href={`tel:${phoneE164}`}
                  className="underline decoration-slate-300 text-primary hover:decoration-slate-500"
                  onClick={() => track("call")}
                >
                  {phoneDisplay}
                </a>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                href={`tel:${phoneE164}`}
                onClick={() => track("call")}
                className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  rounded-lg
                  bg-accent text-white
                  font-semibold
                  shadow-md hover:shadow-lg
                  transition
                "
              >
                Call Now
              </a>

              <a
                href={`sms:${phoneE164}`}
                onClick={() => track("text")}
                className="
                  inline-flex items-center justify-center
                  h-12 px-6
                  rounded-lg
                  bg-white text-primary
                  border border-slate-200
                  font-semibold
                  shadow-sm hover:shadow-md
                  transition
                "
              >
                Text Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
