// zen-car/src/components/Hero.js

import React from "react";
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
          name: { regex: "/^hero-car|^hero-land-rover/" }
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
    .filter((s) => s.image);

  // Desktop only (slick)
  const desktopSliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 650,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5200,
    pauseOnHover: true,
    adaptiveHeight: false,
  };

  return (
    <section
      className="
        relative w-full bg-[#617b7f] text-white
        pt-[57px] md:pt-[57px] pb-10 md:pb-12 overflow-hidden
        rounded-b-[40px]
        shadow-[0_18px_40px_rgba(0,0,0,0.25)]
      "
    >
      {/* Pattern / car-outline background */}
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
          {/* MEDIA (mobile first, desktop right) */}
          <div className="order-1 lg:order-2">
            {/* MOBILE: native swipe carousel (scroll-snap). Reliable + modern. */}
            <div className="lg:hidden -mx-4">
              <div className="relative">
                {/* edge fades so it feels “designed” */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 z-20 bg-gradient-to-r from-[#617b7f] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 z-20 bg-gradient-to-l from-[#617b7f] to-transparent" />

                {carSlides.length > 0 ? (
                  <div
                    className="
                      flex gap-4 overflow-x-auto snap-x snap-mandatory
                      px-4 pb-4
                      [-ms-overflow-style:none] [scrollbar-width:none]
                      [&::-webkit-scrollbar]:hidden
                    "
                  >
                    {carSlides.map((slide, idx) => (
                      <div key={slide.name} className="snap-center shrink-0 w-[92%]">
                        <div
                          className="
                            relative w-full h-[240px]
                            rounded-[24px] overflow-hidden
                            bg-white/10 ring-1 ring-white/15
                            shadow-[0_18px_45px_rgba(0,0,0,0.22)]
                          "
                        >
                          {/* subtle depth */}
                          <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),inset_0_18px_30px_rgba(0,0,0,0.18)]" />
                          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

                          <GatsbyImage
                            image={slide.image}
                            alt="A car delivered after using Zen Car Buying"
                            loading={idx === 0 ? "eager" : "lazy"}
                            className="w-full h-[240px]"
                            imgStyle={{
                              objectFit: "cover",
                              objectPosition: "50% 55%",
                              transform: "scale(1.03)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4">
                    <div className="w-full h-[240px] rounded-[24px] bg-white/10 ring-1 ring-white/15 flex items-center justify-center text-white/85 text-sm text-center px-6">
                      Add hero images named <strong className="mx-1">hero-car*</strong> under the Gatsby
                      <strong className="mx-1">images</strong> source.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DESKTOP: slick carousel framed */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <div
                className="
                  relative
                  w-full max-w-[560px]
                  h-[400px]
                  rounded-[28px]
                  overflow-hidden
                  bg-white/10
                  ring-1 ring-white/20
                  shadow-[0_22px_55px_rgba(0,0,0,0.26)]
                "
              >
                <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.10),inset_0_18px_30px_rgba(0,0,0,0.18)]" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/15" />

                {carSlides.length > 0 ? (
                  <Slider {...desktopSliderSettings}>
                    {carSlides.map((slide) => (
                      <div key={slide.name} className="w-full h-full">
                        <GatsbyImage
                          image={slide.image}
                          alt="A car delivered after using Zen Car Buying"
                          className="w-full h-[400px]"
                          imgStyle={{
                            objectFit: "cover",
                            objectPosition: "42% 58%",
                            transform: "scale(1.06)",
                            transformOrigin: "60% 55%",
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/80">
                    Add hero car images to /src/images (hero-car*.png/jpg/webp)
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
              Enjoy the car buying process without the dealership hassle, your Zen Guide handles everything —
              from research and negotiation to getting the car to your door.
            </p>

            {/* CTAs: side-by-side on mobile (wrap if needed) */}
            <div className="hero-cta flex flex-row flex-wrap gap-3 max-w-[520px]">
              <div className="flex-1 min-w-[160px]">
                <ServiceButton size="lg" color="accent">
                  Explore services
                </ServiceButton>
              </div>
              <div className="flex-1 min-w-[160px]">
                <ServiceButton size="lg" color="secondary">
                  Book consultation
                </ServiceButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fix “ghosting” hover if ServiceButton uses opacity-based hover */}
      <style>{`
        .hero-cta a, .hero-cta button { opacity: 1 !important; }
        .hero-cta a:hover, .hero-cta button:hover { opacity: 1 !important; }
        .hero-cta a:hover *, .hero-cta button:hover * { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
