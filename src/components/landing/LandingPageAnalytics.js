import { useEffect } from "react"
import { DEFAULT_SCROLL_THRESHOLDS } from "../../utils/landingPages"

function pushDataLayerEvent(payload) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

export default function LandingPageAnalytics({
  pageType,
  serviceType,
  city,
  state,
  thresholds = DEFAULT_SCROLL_THRESHOLDS,
}) {
  useEffect(() => {
    pushDataLayerEvent({
      event: "page_context",
      page_type: pageType,
      city: city || "",
      state: state || "",
      service: serviceType,
    })

    if (pageType === "city") {
      pushDataLayerEvent({
        event: "city_page_view",
        city,
        state,
        page_type: "city_landing",
        service: serviceType,
      })
    }
  }, [pageType, serviceType, city, state])

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const fired = new Set()

    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0
      const doc = document.documentElement
      const maxScrollable = doc.scrollHeight - window.innerHeight

      if (maxScrollable <= 0) return

      const percent = Math.round((scrollTop / maxScrollable) * 100)

      thresholds.forEach(threshold => {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          pushDataLayerEvent({
            event: "scroll_depth",
            percent_scrolled: threshold,
            page_type: pageType,
            city: city || "",
            state: state || "",
            service: serviceType,
          })
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pageType, serviceType, city, state, thresholds])

  return null
}
