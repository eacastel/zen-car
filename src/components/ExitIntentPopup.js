import React, { useEffect, useRef, useState } from "react"

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const excludedPaths = ["/vip-consultation/vip/"]
    const currentPath = window.location.pathname
    if (excludedPaths.includes(currentPath)) return

    const shownAt = localStorage.getItem("exitIntentShownAt")
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
    if (shownAt && Date.now() - parseInt(shownAt, 10) < SEVEN_DAYS) return

    const isMobile = window.innerWidth < 768

    const showPopup = () => {
      setVisible(true)
      localStorage.setItem("exitIntentShownAt", Date.now().toString())
    }

    if (!isMobile) {
      const handleMouseMove = e => {
        if (e.clientY < 10) {
          showPopup()
          document.removeEventListener("mousemove", handleMouseMove)
        }
      }
      const delay = setTimeout(() => {
        document.addEventListener("mousemove", handleMouseMove)
      }, 3000)

      return () => {
        clearTimeout(delay)
        document.removeEventListener("mousemove", handleMouseMove)
      }
    } else {
      const handleScroll = () => {
        const scrollPercent =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
        if (scrollPercent > 50) {
          showPopup()
          window.removeEventListener("scroll", handleScroll)
        }
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setVisible(false)
      }
    }
    if (visible) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [visible])

  const handleClose = () => setVisible(false)

  const handleBookCall = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "exit_intent_cta_click",
        label: "Exit Intent Popup",
      })

      if (window.openCalendlyPopup) {
        window.openCalendlyPopup()
      } else {
        window.location.href = "/vip-consultation/vip/"
      }
      setVisible(false)
    }
  }

  const handleContinuePurchase = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "exit_intent_continue_purchase" })
      setVisible(false)

      // Smooth-scroll and focus back to purchase section
      setTimeout(() => {
        const target = document.querySelector("#purchase-start")
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
          // make sure focusable, then focus (a11y)
          if (!target.hasAttribute("tabindex"))
            target.setAttribute("tabindex", "-1")
          target.focus({ preventScroll: true })
        }
      }, 50)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-secondary rounded-2xl shadow-2xl pt-0 pb-0 font-poppins animate-fade-in overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
      >
        {/* Top bar */}
        <div className="bg-primary text-white text-md uppercase tracking-wider font-pirulen py-3 text-center">
          Not ready to decide yet?
        </div>

        {/* Close X */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-white/90 text-primary rounded-full w-6 h-6 flex items-center justify-center shadow-lg border border-primary hover:bg-white hover:scale-105 active:scale-95 transition-all duration-150"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Main content */}
        <div className="bg-white mx-0 mt-0 mb-2 p-6 rounded-xl text-center">
          <h2
            id="exit-intent-title"
            className="text-2xl font-medium text-accent mb-3 font-poppins"
          >
            Make your next move with confidence.
          </h2>
          <p className="text-md text-primary mb-4">
            A quick chat with a Zen Guide could save you thousands.
          </p>

          <button
            onClick={handleBookCall}
            className="bg-accent text-white px-6 py-2 rounded-full shadow hover:bg-accent-dark transition font-medium"
          >
            Schedule My Free Call
          </button>

          {/* NEW: Continue with purchase link */}
          <p className="mt-4 text-sm text-primary">
            To close this window,&nbsp;
            <button
              onClick={handleContinuePurchase}
              className="underline text-accent hover:text-accent-dark focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
              aria-label="Continue with the purchase"
            >
              click here
            </button>
            .
          </p>
        </div>

        {/* Bottom footer */}
        <div className="text-primary text-s text-center pt-1 pb-3 px-4">
          No spam. No pushy sales talk. Just expert guidance.
        </div>
      </div>
    </div>
  )
}
