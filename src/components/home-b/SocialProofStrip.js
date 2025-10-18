// src/components/home-b/SocialProofStrip.js
import React from "react";

export default function SocialProofStrip() {
  return (
    <section className="bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px] py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-600 text-center md:text-left">
            Trusted by buyers nationwide — from first-time shoppers to luxury seekers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-80">
            <span className="text-xs uppercase tracking-widest">BMW</span>
            <span className="text-xs uppercase tracking-widest">Lexus</span>
            <span className="text-xs uppercase tracking-widest">Audi</span>
            <span className="text-xs uppercase tracking-widest">Toyota</span>
            <span className="text-xs uppercase tracking-widest">Honda</span>
          </div>
        </div>
      </div>
    </section>
  );
}
