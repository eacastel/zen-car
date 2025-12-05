import React, { useEffect } from "react"
import { useLocation } from "@reach/router"
import Header from "./Header";
import Footer from "./Footer";
import FloatingTextButton from "./FloatingTextButton"; 

export default function Layout({ children }) {
  const location = useLocation();

  // Logic: If on Homepage OR VIP page, remove top padding so header is transparent over hero
  const isTransparentPage = 
    location.pathname === "/" || 
    location.pathname === "" || 
    location.pathname.startsWith("/vip-consultation");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.pathname])

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* CONDITIONAL PADDING: 
            If transparent page: Padding 0 (Content touches top of screen).
            Otherwise: Padding 88px (Content pushed down below header).
        */}
        <main 
          className={`flex-grow ${
            isTransparentPage ? "" : "pt-[88px] max-[364px]:pt-[136px]"
          }`}
        >
          {children}
        </main>
        
        <Footer />
        <FloatingTextButton /> 
      </div>
    </>
  );
}