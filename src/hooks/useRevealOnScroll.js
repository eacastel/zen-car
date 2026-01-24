// src/hooks/useRevealOnScroll.js
import { useEffect, useRef, useState } from "react";

export default function useRevealOnScroll(options = { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, options);

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);

  return { ref, isVisible };
}
