import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingTextButton from "./FloatingTextButton"; // Import Floating Button

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingTextButton /> {/* Floating SMS Button */}
    </>
  );
}
