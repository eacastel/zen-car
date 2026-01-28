// zen-car/src/components/Hero.js

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ServiceButton from "../components/ServiceButton";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function Hero() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

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

  const carSlides = (data.heroCars?.nodes || [])
    .map((n) => ({ name: n.name, image: getImage(n) }))
    .filter((s) => !!s.image);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    pauseOnHover: true,

    // mobile swipe
    swipe: true,
    draggable: true,
    touchMove: true,
    swipeToSlide: true,
    touchThreshold: 10,
    waitForAnimate: false,

    // perf
    lazyLoad: "ondemand",
    adaptiveHeight: false,
  };

  const fallbackSlide = carSlides[0]?.image || null;

  return (
    <section
      className="
        relative w-full bg-[#617b7f] text-white
        pt-[57px] md:pt-[57px] pb-10 md:pb-12 overflow-hidden
        rounded-b-[40px]
        shadow-[0_18px_40px_rgba(0,0,0,0.25)]
      "
    >
      {patternImg && (
        <GatsbyImage
          image={patternImg}
          alt=""
          aria-hidden="true"
          className="absolute bottom-[40px] right-[-60px] opacity-20 w-[1200px] pointer-events-none"
          imgStyle={{ objectFit: "cover" }}
        />
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid gap-8 md:gap-10 items-start py-6 md:py-10 lg:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* MEDIA */}
          <div className="order-1 lg:order-2">
            <div className="-mx-4 lg:mx-0">
              <div
                className="
                  hero-media
                  relative
                  w-full
                  h-[240px] sm:h-[300px] md:h-[340px] lg:h-[400px]
                  rounded-[24px] lg:rounded-[28px]
                  overflow-hidden
                  bg-white/10
                  ring-1 ring-white/15
                  shadow-[0_18px_45px_rgba(0,0,0,0.22)]
                "
              >
                {/* depth */}
                <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),inset_0_18px_30px_rgba(0,0,0,0.18)]" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

                {carSlides.length > 0 ? (
                  isClient ? (
                    <Slider className="hero-slick" {...sliderSettings}>
                      {carSlides.map((slide, idx) => (
                        <div key={slide.name}>
                          <GatsbyImage
                            image={slide.image}
                            alt="A car delivered after using Zen Car Buying"
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="w-full h-[240px] sm:h-[300px] md:h-[340px] lg:h-[400px]"
                            imgStyle={{
                              objectFit: "cover",
                              objectPosition: "50% 55%",
                              transform: "scale(1.02)",
                            }}
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : fallbackSlide ? (
                    <GatsbyImage
                      image={fallbackSlide}
                      alt="A car delivered after using Zen Car Buying"
                      className="w-full h-full"
                      imgStyle={{
                        objectFit: "cover",
                        objectPosition: "50% 55%",
                        transform: "scale(1.02)",
                      }}
                    />
                  ) : null
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/85 text-sm text-center px-6">
                    Add hero images named <strong className="mx-1">hero-car-*</strong> under the Gatsby{" "}
                    <strong className="mx-1">images</strong> source.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* COPY */}
          <div className="order-2 lg:order-1 text-left">
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
              Enjoy the car buying process without the dealership hassle, your Zen Guide handles everything — from
              research and negotiation to getting the car to your door.
            </p>

            <div className="hero-cta flex flex-row flex-wrap gap-3 max-w-[520px] pr-2">
              <div className="flex-1 min-w-[140px]">
                <ServiceButton size="lg" color="accent">
                  Explore services
                </ServiceButton>
              </div>
              <div className="flex-1 min-w-[140px]">
                <ServiceButton size="lg" color="secondary">
                  Book consultation
                </ServiceButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Make swipe work reliably */
        .hero-slick .slick-list { touch-action: pan-y; }

        /* Dots */
        .hero-slick .slick-dots { bottom: 10px; }
        .hero-slick .slick-dots li button:before { font-size: 10px; opacity: 0.5; }
        .hero-slick .slick-dots li.slick-active button:before { opacity: 0.9; }

        /* Medium screens: show a bit more top (reduce “cutoff”) */
        @media (min-width: 768px) {
          .hero-media img {
            object-position: 50% 45% !important;
            transform: scale(1.01) !important;
          }
        }

        /* Stop hover “ghosting” in hero CTA only */
        .hero-cta a, .hero-cta button { opacity: 1 !important; filter: none !important; }
        .hero-cta a:hover, .hero-cta button:hover { opacity: 1 !important; filter: none !important; }
      `}</style>
    </section>
  );
}
