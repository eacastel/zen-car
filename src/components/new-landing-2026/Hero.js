// zen-car/src/components/Hero.js

import React, { useMemo } from "react";
import Slider from "react-slick";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ServiceButton from "../ServiceButton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Hero() {
  const data = useStaticQuery(graphql`
    query HomeHero2025 {
      pattern: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "hero-pattern-car-outline.png" }
      ) {
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
          relativeDirectory: { eq: "hero" }
          name: { regex: "/^(hero-car-)/" }
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

  const patternImg = getImage(data?.pattern);
  const carSlides = useMemo(() => {
    return (data?.heroCars?.nodes || [])
      .map((n) => ({ name: n.name, image: getImage(n) }))
      .filter((s) => !!s.image);
  }, [data?.heroCars]);

  // --- SAFE MODE SETTINGS ---
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,

    // 1. DESKTOP: DISABLE ALL INTERACTIONS
    // This ensures Slick acts as a simple "viewer" and doesn't hijack the mouse.
    draggable: false,
    swipe: false, // Critical: Disable swipe on desktop to prevent event capturing
    accessibility: false, // Prevents focus stealing on scroll

    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,

    responsive: [
      {
        // 2. TABLET/MOBILE: RE-ENABLE TOUCH
        // We only enable swipe/touch behaviors on smaller screens where they are needed.
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "15%",
          swipe: true, // Enable swipe for touch devices
          swipeToSlide: true,
          touchThreshold: 10,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "10%",
          swipe: true,
          swipeToSlide: true,
        },
      },
    ],
  };

  return (
    <section
      className="
        hero-section-root
        relative w-full bg-[#617b7f] text-white
        pt-[57px] md:pt-[57px] pb-10 md:pb-12
        rounded-b-[40px]
        shadow-[0_18px_40px_rgba(0,0,0,0.25)]
        overflow-hidden
      "
    >
      {/* Background Pattern */}
      {patternImg && (
        <div className="absolute bottom-[40px] right-[-60px] opacity-20 w-[1200px] pointer-events-none z-0">
          <GatsbyImage
            image={patternImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full"
            imgStyle={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-6">
        <div className="grid gap-8 md:gap-10 items-start py-6 md:py-10 lg:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">

          {/* MEDIA COLUMN (Slider) */}
          {/* Added 'z-0' to push it to the back stack, just in case */}
          <div className="order-1 lg:order-2 min-w-0 relative z-0">
            <div
              className="
                hero-media
                relative w-full
                h-[230px] sm:h-[280px] md:h-[320px] 
                lg:h-[400px] lg:max-w-[560px] lg:ml-auto
                rounded-[24px] lg:rounded-[28px]
                /* Only hide overflow on the media wrapper, not the slider track */
                overflow-hidden
              "
            >
              {carSlides.length > 0 ? (
                <Slider className="hero-slick h-full" {...sliderSettings}>
                  {carSlides.map((slide, idx) => (
                    <div key={slide.name} className="h-full px-2 lg:px-0 outline-none">
                      <div
                        className="
                          relative w-full h-full
                          rounded-[24px] overflow-hidden
                          bg-white/10 ring-1 ring-white/15
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
                            transform: "scale(1.03)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/10 rounded-[24px] ring-1 ring-white/15 px-6 text-center text-sm">
                  Add hero images to src/images/hero/
                </div>
              )}
            </div>
          </div>

          {/* TEXT COLUMN */}
          {/* Added 'z-10' to ensure text is ALWAYS clickable/scrollable above the slider */}
          <div className="order-2 lg:order-1 text-left min-w-0 relative z-10 pointer-events-auto">
            <p className="text-lg uppercase tracking-wider mb-4 font-pirulen text-accent">
              THE MODERN APPROACH TO CAR BUYING
            </p>

            <h1 className="text-[40px] leading-[1.05] md:text-5xl mb-4 font-poppins">
              <span className="block capitalize">Car buying made simple</span>
            </h1>

            <p className="text-base sm:hidden text-[#f4fbfb] mb-6">
              Your Zen Guide handles the research, negotiation and delivery.
            </p>
            <p className="hidden sm:block text-base sm:text-lg max-w-none lg:max-w-[42ch] xl:max-w-[52ch] mb-8 text-[#f4fbfb]">

              We handle the research, negotiation and delivery saving you time, money and stress!
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-[520px] pr-2">
              <ServiceButton
                size="lg"
                color="accent"
                trackingEvent="cta_click"
                trackingLabel="hero_explore_services"
                trackingLocation="hero"
                trackingDestination="/services/"
              >
                Explore services
              </ServiceButton>
              <ServiceButton
                size="lg"
                color="secondary"
                to="/vip-consultation/vip/"
                trackingEvent="cta_click"
                trackingLabel="hero_book_consultation"
                trackingLocation="hero"
              >
                Book consultation
              </ServiceButton>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* 1. FORCE HEIGHTS */
        .hero-media .slick-slider,
        .hero-media .slick-list,
        .hero-media .slick-track,
        .hero-media .slick-slide,
        .hero-media .slick-slide > div {
          height: 100%;
        }

        /* 2. NUCLEAR SCROLL FIX 
           This explicitly resets touch-action for the whole section 
           and only enables pan-y (vertical scroll) on the slider.
        */
        .hero-section-root {
          touch-action: auto !important;
        }
        .hero-media .slick-slider,
        .hero-media .slick-list,
        .hero-media .slick-track {
          touch-action: pan-y !important;
        }

        /* 3. POINTER EVENTS CLEANUP
           Ensure the slider wrapper doesn't block clicks/scrolls in empty spaces 
        */
        .hero-media .slick-list {
            pointer-events: none;
        }
        .hero-media .slick-slide {
            pointer-events: auto; /* Re-enable events on the images */
        }

        /* Dots adjustment */
        .hero-media .slick-dots {
          bottom: -25px;
        }
        .hero-media .slick-dots li button:before {
          color: white;
          opacity: 0.35;
          font-size: 10px;
        }
        .hero-media .slick-dots li.slick-active button:before {
          color: white;
          opacity: 0.9;
        }
      `}</style>
    </section>
  );
}
