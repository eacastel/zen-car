// src/components/SectionBand.js
import React from "react";

export default function SectionBand({ children, className = "" }) {
  return (
    <div
      className={[
        "relative",
        "bg-gradient-to-b from-[#EAF4F4] via-white to-[#EAF4F4]",
        "py-10",
        className,
      ].join(" ")}
    >
      {/* top fade */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent" />
      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
      {children}
    </div>
  );
}
