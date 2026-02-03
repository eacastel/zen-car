// zen-car/src/components/CarLogoStrip.js
import React from "react";

import Acura from "../../images/brands/acura.svg";
import Audi from "../../images/brands/audi.svg";
import BMW from "../../images/brands/bmw.svg";
import Ford from "../../images/brands/ford.svg";
import Honda from "../../images/brands/honda.svg";
import Volvo from "../../images/brands/volvo.svg";
import Mercedes from "../../images/brands/mercedes-benz.svg";
import Hyundai from "../../images/brands/hyundai.svg";

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
}) {
  return (
    <section className="w-full bg-[#617b7f] py-10">
      {/* Keep the grid centered, minimal outer padding only for small screens */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-white capitalize">{title}</h3>
          <p className="mt-2 text-sm md:text-base text-white/80">{subtitle}</p>
        </div>

        {/* Grid only, no card wrapper */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 md:gap-6 items-center">
          {LOGOS.map(({ name, Src }) => (
            <div key={name} className="flex items-center justify-center">
              {/* per-logo padding only */}
              <div className="w-full flex items-center justify-center py-4">
                <img
                  src={Src}
                  alt={`${name} logo`}
                  loading="lazy"
                  className="w-auto h-20 md:h-24 lg:h-34 opacity-90"
                  style={{
                    // Force white regardless of SVG fill/stroke colors
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-white/70">
          Brand logos are used for familiarity only and do not imply affiliation.
        </p>
      </div>
    </section>
  );
}
