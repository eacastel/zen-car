// zen-car/src/components/HeroSocialProof.js

import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import testimonialsData from "../../data/testimonials.json";

const StarRow = () => (
  <div className="flex items-center gap-1 shrink-0" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="text-[22px] leading-none text-[#FFC107]">
        ★
      </span>
    ))}
  </div>
);

export default function HeroSocialProof() {
  const data = useStaticQuery(graphql`
    query HeroSocialProofGoogleLogo {
      google: file(relativePath: { eq: "google-g.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 36, height: 36, placeholder: NONE)
        }
      }
    }
  `);

  const googleImg = getImage(data.google);

  const allItems = testimonialsData || [];
  const desktopItems = allItems.slice(0, 3);
  const mobileItems = allItems;

  const truncateWords = (text = "", maxWords = 28) => {
    const words = String(text).trim().split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return String(text).trim();
    return `${words.slice(0, maxWords).join(" ")}…`;
  };

  return (
    <section aria-label="Social proof" className="relative z-20 -mt-10 sm:-mt-12">
      <div className="container mx-auto px-4   md:px-8 md:max-w-[1280px]">
        <div className="bg-white rounded-[28px] shadow-[0_22px_50px_rgba(0,0,0,0.18)] border border-black/10 px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          {/* Header: title left, logos right (no shrink / no cutoff) */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 mb-6">
            <div className="min-w-0">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1f2a2c] capitalize">
                Trusted by car buyers across the U.S.
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#1f2a2c]/70">
                Real reviews. Real savings. A calmer way to buy.
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 flex-nowrap shrink-0">
              <Link
                to="/reviews/"
                className="flex items-center gap-3 px-3 py-2 hover:opacity-95 shrink-0"
                aria-label="Read Google reviews"
              >
                {googleImg ? (
                  <GatsbyImage image={googleImg} alt="Google" className="w-[36px] h-[36px] shrink-0" />
                ) : (
                  <span className="text-sm font-semibold">G</span>
                )}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-[#1f2a2c]">5/5 in Google</span>
                  <span className="text-xs text-[#1f2a2c]/60">Read reviews</span>
                </div>
              </Link>

              <a
                href="https://www.bbb.org/us/wa/spokane/profile/car-buying/zen-car-buying-llc-1296-1000183307/#sealclick"
                target="_blank"
                rel="noreferrer nofollow"
                className="flex items-center px-3 py-2 hover:opacity-95 shrink-0"
                aria-label="Zen Car Buying BBB Business Review"
              >
                <img
                  src="https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-120-61-bbb-1000183307.png"
                  alt="Zen Car Buying LLC BBB Business Review"
                  width={120}
                  height={61}
                  loading="lazy"
                  decoding="async"
                  className="opacity-90 hover:opacity-100 transition-opacity duration-300 shrink-0"
                  style={{ border: 0, width: 120, height: "auto" }}
                />
              </a>
            </div>
          </div>

          {/* Mobile: swipeable list with more reviews */}
          <div
            className="
              flex gap-4 overflow-x-auto pb-2 -mx-2 px-2
              snap-x snap-mandatory
              lg:hidden
            "
            aria-label="Customer testimonials"
          >
            {mobileItems.map((t, idx) => {
              const headline = t.note || "Great experience";
              const nameCar = t.name || "";
              const quote = t.quote || "";

              return (
                <article
                  key={idx}
                  className="
                    snap-start shrink-0
                    w-[78%] sm:w-[52%] md:w-[46%]
                    rounded-[18px] border border-black/10 bg-white px-5 py-5
                  "
                >
                  <header className="mb-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-[#1f2a2c] leading-tight pr-2">
                        {headline}
                      </h3>
                      <StarRow />
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#1f2a2c]/60">{nameCar}</p>
                  </header>

                  <p className="text-[15px] sm:text-base text-[#1f2a2c]/80 leading-relaxed">
                    “{truncateWords(quote, 28)}”
                  </p>

                  <div className="mt-4">
                    <Link to="/reviews/" className="text-xs font-semibold text-[#F5A623]">
                      Read more
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop: fixed 3-up grid */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-4">
            {desktopItems.map((t, idx) => {
              const headline = t.note || "Great experience";
              const nameCar = t.name || "";
              const quote = t.quote || "";

              return (
                <article
                  key={idx}
                  className="rounded-[18px] border border-black/10 bg-white px-5 py-5"
                >
                  <header className="mb-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base sm:text-lg font-semibold text-[#1f2a2c] leading-tight pr-2">
                        {headline}
                      </h3>
                      <StarRow />
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#1f2a2c]/60">{nameCar}</p>
                  </header>

                  <p className="text-[15px] sm:text-base text-[#1f2a2c]/80 leading-relaxed">
                    “{truncateWords(quote, 28)}”
                  </p>

                  <div className="mt-4">
                    <Link to="/reviews/" className="text-xs font-semibold text-[#F5A623]">
                      Read more
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-[#1f2a2c]/50 lg:hidden">
            Swipe to see more reviews
          </p>
        </div>
      </div>
    </section>
  );
}
