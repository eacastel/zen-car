import React, { useEffect } from "react"
import { useLocation } from "@reach/router"
import Header from "./Header";
import Footer from "./Footer";
import FloatingTextButton from "./FloatingTextButton"; 

export default function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [location.pathname])

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingTextButton /> 
      </div>
    </>
  );
}
