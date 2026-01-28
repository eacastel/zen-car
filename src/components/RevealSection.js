// src/components/RevealSection.js
import React from "react";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

export default function RevealSection({ children }) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
