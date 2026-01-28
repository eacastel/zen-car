// zen-car/src/components/Hero.js

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Slider from "react-slick";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ServiceButton from "../components/ServiceButton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Hero() {
  const data = useStaticQuery(graphql`
    query HomeHero2025 {
      pattern: file(relativePath: { eq: "hero-pattern-car-outline.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }

      heroCars: allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          name: { regex: "/^(hero-car-|hero-land-rover)/" }
          extension: { regex: "/(png|jpe?g|webp)/" }
        }
        sort: { name: ASC }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 1600
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 90
            )
          }
        }
      }
    }
  `);

  const patternImg = getImage(data.pattern);

  const carSlides = useMemo(() => {
    return (data.heroCars?.nodes || [])
      .map((n) => ({ name: n.name, image: getImage(n) }))
      .filter((s) => !!s.image);
  }, [data.heroCars]);

  // Slick (desktop only)
  const desktopSliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,
    swipe: true,
    draggable: true,
    touchMove: true,
    swipeToSlide: true,
    lazyLoad: "ondemand",
    adaptiveHeight: false,
  };

  // Mobile scroller (scroll-snap + auto-advance)
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  // Scroll horizontally to a slide WITHOUT affecting page scroll
  const scrollToIndex = useCallback((i) => {
    const el = scrollerRef.current;
    if (!el) return;

    const slides = Array.from(el.querySelectorAll("[data-hero-slide]"));
    const node = slides[i];
    if (!node) return;

    const targetLeft = node.offsetLeft - (el.clientWidth - node.clientWidth) / 2;
    el.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, []);

  // Track active slide on scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(el.querySelectorAll("[data-hero-slide]"));
        if (!slides.length) return;

        const viewportCenter = el.scrollLeft + el.clientWidth / 2;

        let bestIdx = 0;
        let bestDist = Infinity;

        slides.forEach((node, idx) => {
          const center = node.offsetLeft + node.clientWidth / 2;
          const dist = Math.abs(center - viewportCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        });

        activeIndexRef.current = bestIdx;
        setActiveIndex(bestIdx);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Auto-advance every 5500ms (no scrollIntoView -> no page jump)
  useEffect(() => {
    if (carSlides.length <= 1) return;

    const id = window.setInterval(() => {
      const next = (activeIndexRef.current + 1) % carSlides.length;
      scrollToIndex(next);
    }, 5500);

    return () => window.clearInterval(id);
  }, [carSlides.length, scrollToIndex]);

  return (
    <section
      className="
        relative isolate w-full bg-[#617b7f] text-white
        pt-[57px] md:pt-[57px] pb-10 md:pb-12 overflow-hidden
        rounded-b-[40px]
        shadow-[0_18px_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* Pattern background: force BEHIND and push down so it doesn't sit "on top" on mobile */}
      {patternImg && (
        <GatsbyImage
          image={patternImg}
          alt=""
          aria-hidden="true"
          className="
            absolute z-0 pointer-events-none
            opacity-[0.18]
            w-[900px] sm:w-[1050px] lg:w-[1200px]
            right-[-110px]
            bottom-[-170px] sm:bottom-[-220px] lg:bottom-[40px]
          "
          imgStyle={{
            objectFit: "cover",
            objectPosition: "right bottom",
          }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid gap-8 md:gap-10 items-start py-6 md:py-10 lg:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* MEDIA */}
          <div className="order-1 lg:order-2 min-w-0">
            {/* MOBILE + MD: film-strip scroll-snap (partial neighbors visible) */}
            <div className="lg:hidden">
              {carSlides.length > 0 ? (
                <div className="relative">
                  <div
                    ref={scrollerRef}
                    className="
                      flex gap-4 overflow-x-auto snap-x snap-mandatory
                      px-4 pr-14 pb-3
                      overscroll-x-contain
                      [-ms-overflow-style:none] [scrollbar-width:none]
                      [&::-webkit-scrollbar]:hidden
                    "
                    style={{
                      WebkitOverflowScrolling: "touch",
                      touchAction: "pan-x",
                      scrollPaddingLeft: "16px",
                      scrollPaddingRight: "56px",
                    }}
                  >
                    {carSlides.map((slide, idx) => (
                      <div
                        key={slide.name}
                        data-hero-slide
                        className="snap-center shrink-0 w-[88%] sm:w-[82%] md:w-[72%]"
                      >
                        <div
                          className="
                            relative
                            h-[230px] sm:h-[280px] md:h-[320px]
                            rounded-[24px] overflow-hidden
                            bg-white/10
                            ring-1 ring-white/15
                            shadow-[0_18px_45px_rgba(0,0,0,0.22)]
                          "
                        >
                          <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),inset_0_18px_30px_rgba(0,0,0,0.18)]" />

                          <GatsbyImage
                            image={slide.image}
                            alt="A car delivered after using Zen Car Buying"
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="w-full h-full"
                            imgStyle={{
                              objectFit: "cover",
                              objectPosition: "50% 55%",
                              transform: "scale(1.02)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* dots */}
                  <div className="flex justify-center gap-2 mt-2">
                    {carSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        className={[
                          "h-2 w-2 rounded-full transition-opacity bg-white",
                          i === activeIndex ? "opacity-90" : "opacity-35",
                        ].join(" ")}
                        onClick={() => scrollToIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-[230px] rounded-[24px] bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white/85 text-sm text-center px-6">
                  Add hero images named <strong className="mx-1">hero-car-*</strong> (or hero-land-rover*)
                  under the Gatsby <strong className="mx-1">images</strong> source.
                </div>
              )}
            </div>

            {/* DESKTOP: slick */}
            <div className="hidden lg:flex justify-center lg:justify-end min-w-0">
              <div
                className="
                  hero-media
                  relative w-full max-w-[560px] h-[400px]
                  rounded-[28px] overflow-hidden
                  bg-white/10 ring-1 ring-white/20
                  shadow-[0_22px_55px_rgba(0,0,0,0.26)]
                "
              >
                <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),inset_0_18px_30px_rgba(0,0,0,0.18)]" />

                {carSlides.length > 0 ? (
                  <Slider className="hero-slick" {...desktopSliderSettings}>
                    {carSlides.map((slide) => (
                      <div key={slide.name} className="h-full">
                        <GatsbyImage
                          image={slide.image}
                          alt="A car delivered after using Zen Car Buying"
                          className="w-full h-[400px]"
                          imgStyle={{
                            objectFit: "cover",
                            objectPosition: "50% 50%",
                            transform: "scale(1.03)",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">
                    Add hero images to /src/images (hero-car-*.png/jpg/webp)
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COPY */}
          <div className="order-2 lg:order-1 text-left min-w-0">
            <p className="text-lg uppercase tracking-wider mb-4 font-pirulen text-accent">
              THE MODERN APPROACH TO CAR BUYING
            </p>

            <h1 className="text-[40px] leading-[1.05] md:text-5xl mb-4 font-poppins">
              <span className="block">Car buying made simple and stress-free</span>
            </h1>

            <p className="text-base sm:hidden text-[#f4fbfb] mb-6">
              Your Zen Guide handles the research, negotiation, and delivery.
            </p>
            <p className="hidden sm:block text-base sm:text-lg max-w-md mb-8 text-[#f4fbfb]">
              Enjoy the car buying process without the dealership hassle, your Zen Guide handles everything —
              from research and negotiation to getting the car to your door.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-[520px] pr-2">
              <ServiceButton size="lg" color="accent">
                Explore services
              </ServiceButton>
              <ServiceButton size="lg" color="secondary">
                Book consultation
              </ServiceButton>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* keep slick height stable on desktop */
        .hero-media .hero-slick,
        .hero-media .hero-slick .slick-list,
        .hero-media .hero-slick .slick-track,
        .hero-media .hero-slick .slick-slide,
        .hero-media .hero-slick .slick-slide > div {
          height: 100%;
        }

        /* prevent tap highlight / weird "ghost" interaction feel */
        a, button { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </section>
  );
}
