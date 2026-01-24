// src/components/SoftDivider.js
import React from "react";

export default function SoftDivider() {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>
    </div>
  );
}
