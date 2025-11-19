import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ServiceButton from "../components/ServiceButton";

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
      person: file(relativePath: { eq: "hero-consultation.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 420
            placeholder: BLURRED
            quality: 90
          )
        }
      }
      driveway: file(relativePath: { eq: "hero-driveway-bmw.png" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 420
            placeholder: BLURRED
            quality: 90
          )
        }
      }
    }
  `);

  const patternImg = getImage(data.pattern);
  const personImg = getImage(data.person);
  const drivewayImg = getImage(data.driveway);

  return (
    <section
      className="
        relative
        w-full
        bg-[#617b7f]    /* hero teal/gray */
        text-white
        pt-[96px]       /* leave room for fixed header */
        pb-12
        overflow-hidden
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
  className="absolute bottom-[-12px] right-[-13px] opacity-20 w-[550px] pointer-events-none"
          imgStyle={{ objectFit: "cover" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center py-12 lg:py-16">
          {/* Left column: copy + CTAs */}
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4 font-poppins">
              <span className="block">Car buying made</span>
              <span className="block">simple and</span>
              <span className="block">stress-free</span>
            </h1>

            <p className="text-base sm:text-lg max-w-md mb-8 text-[#f4fbfb]">
              Skip the dealership hassle, your Zen Guide handles everything —
              from research and negotiation to getting the car to your door.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <ServiceButton size="lg" color="accent">
                Explore services
              </ServiceButton>

              <ServiceButton size="lg" color="secondary">
                Book consultation
              </ServiceButton>
            </div>
          </div>

          {/* Right column: stacked images */}
          <div className="flex justify-center lg:justify-end gap-6">
            <div className="hidden sm:block self-center rounded-[32px] overflow-hidden shadow-xl bg-black/20">
              {personImg && (
                <GatsbyImage
                  image={personImg}
                  alt="Happy client on a call with a Zen Guide confirming car details"
                  className="w-[220px] h-[340px] object-cover"
                  imgStyle={{ objectFit: "cover" }}
                />
              )}
            </div>
            <div className="rounded-[32px] overflow-hidden shadow-xl bg-black/20">
              {drivewayImg && (
                <GatsbyImage
                  image={drivewayImg}
                  alt="Premium car delivered to client’s home after using Zen Car Buying"
                  className="w-[200px] h-[340px] sm:w-[240px] sm:h-[360px] object-cover"
                  imgStyle={{ objectFit: "cover" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
