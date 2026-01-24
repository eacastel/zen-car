// zen-car/src/components/CarLogoStrip.js
import React from "react";

// IMPORTANT: replace these with your actual SVG filenames in /src/images/brands/
import Acura from "../images/brands/acura.svg";
import Audi from "../images/brands/audi.svg";
import BMW from "../images/brands/bmw.svg";
import Ford from "../images/brands/ford.svg";
import Honda from "../images/brands/honda.svg";
import Volvo from "../images/brands/volvo.svg";
import Mercedes from "../images/brands/mercedes-benz.svg";
import Hyundai from "../images/brands/hyundai.svg";

const LOGOS = [
  { name: "Acura", Src: Acura },
  { name: "Audi", Src: Audi },
  { name: "BMW", Src: BMW },
  { name: "Ford", Src: Ford },
  { name: "Honda", Src: Honda },
  { name: "Volvo", Src: Volvo },
  { name: "Mercedes-Benz", Src: Mercedes },
  { name: "Hyundai", Src: Hyundai },
];

export default function CarLogoStrip({
  title = "We help with most makes",
  subtitle = "New or used. Mainstream or premium. Your Zen Guide works with your preferences.",
  variant = "dark", // "dark" for hero, "light" for white sections
}) {
  const isDark = variant === "dark";

  return (
    <section className={isDark ? "py-10" : "py-10"}>
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-6">
          <h3
            className={[
              "text-xl md:text-2xl font-semibold",
              isDark ? "text-white" : "text-primary",
            ].join(" ")}
          >
            {title}
          </h3>
          <p
            className={[
              "mt-2 text-sm md:text-base",
              isDark ? "text-white/80" : "text-gray-700",
            ].join(" ")}
          >
            {subtitle}
          </p>
        </div>

        <div
          className={[
            "rounded-2xl",
            isDark
              ? "bg-white/10 border border-white/15"
              : "bg-[#EAF4F4] border border-black/5",
            "shadow-[0_12px_30px_rgba(0,0,0,0.10)]",
            "px-5 py-6 md:px-10 md:py-8",
          ].join(" ")}
        >
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 items-center">
            {LOGOS.map(({ name, Src }) => (
              <div
                key={name}
                className={[
                  "group",
                  "flex items-center justify-center",
                  "select-none",
                ].join(" ")}
                aria-label={name}
                title={name}
              >
                <div
                  className={[
                    "relative",
                    "flex items-center justify-center",
                    "w-full",
                    "rounded-xl",
                    "transition-all duration-200 ease-out",
                    "transform-gpu",
                    "group-hover:-translate-y-0.5 group-hover:scale-[1.04]",
                    isDark
                      ? "bg-white/0 group-hover:bg-white/10"
                      : "bg-white/50 group-hover:bg-white",
                    "px-3 py-3",
                  ].join(" ")}
                >
                  {/* Sheen underline on hover */}
                  <span
                    className={[
                      "pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2",
                      "h-px w-0",
                      "bg-gradient-to-r from-transparent via-white/70 to-transparent",
                      "transition-all duration-300 ease-out",
                      "group-hover:w-2/3",
                      isDark ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  />

                  {/* SVG logo */}
                  <img
                    src={Src}
                    alt={`${name} logo`}
                    className={[
                      "h-7 md:h-8 w-auto",
                      "opacity-80",
                      "transition-all duration-200 ease-out",
                      isDark
                        ? "invert brightness-200 group-hover:opacity-100"
                        : "opacity-70 group-hover:opacity-100",
                      "drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]",
                    ].join(" ")}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          <p
            className={[
              "mt-5 text-center text-xs",
              isDark ? "text-white/70" : "text-gray-600",
            ].join(" ")}
          >
            Brand logos are used for familiarity only and do not imply affiliation.
          </p>
        </div>
      </div>
    </section>
  );
}
