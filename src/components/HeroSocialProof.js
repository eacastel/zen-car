import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import testimonialsData from "../data/testimonials.json";

const StarRow = () => (
  <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="text-[22px] leading-none text-[#FFC107]">★</span>
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

  // pick first 3 (or swap to .slice(0, 6) if you want more in the carousel)
  const items = (testimonialsData || []).slice(0, 3);

  const truncateWords = (text = "", maxWords = 28) => {
  const words = String(text).trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return String(text).trim();
  return `${words.slice(0, maxWords).join(" ")}…`;
};


  return (
    <section aria-label="Social proof" className="relative z-20 -mt-10 sm:-mt-12">
      <div className="container mx-auto px-4 md:px-2 md:max-w-[750px] lg:px-6 lg:max-w-[1280px]">
        <div className="bg-white rounded-[28px] shadow-[0_22px_50px_rgba(0,0,0,0.18)] border border-black/10 px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1f2a2c]">
              Trusted by car buyers across the U.S.
            </h2>
            <p className="mt-2 text-base sm:text-lg text-[#1f2a2c]/70">
              Real reviews. Real savings. A calmer way to buy.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-7">
            <Link
              to="/reviews/"
              className="flex items-center gap-3  px-4 py-3 hover:opacity-95"
              aria-label="Read Google reviews"
            >
              {googleImg ? (
                <GatsbyImage image={googleImg} alt="Google" className="w-[36px] h-[36px]" />
              ) : (
                <span className="text-sm font-semibold">G</span>
              )}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-[#1f2a2c]">5/5 in Google</span>
                <span className="text-xs text-[#1f2a2c]/60">Read reviews</span>
              </div>
            </Link>

            {/* BBB remote seal */}
            <a
              href="https://www.bbb.org/us/wa/spokane/profile/car-buying/zen-car-buying-llc-1296-1000183307/#sealclick"
              target="_blank"
              rel="noreferrer nofollow"
              className="flex items-center gap-3  px-4 py-3 hover:opacity-95"
              aria-label="Zen Car Buying BBB Business Review"
            >
              <img
                src="https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-120-61-bbb-1000183307.png"
                alt="Zen Car Buying LLC BBB Business Review"
                width={120}
                height={61}
                loading="lazy"
                decoding="async"
                className="opacity-90 hover:opacity-100 transition-opacity duration-300"
                style={{ border: 0 }}
              />
            </a>
          </div>

          {/* Testimonials: carousel on mobile, grid on desktop */}
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
            <div
              className="
                flex gap-4 overflow-x-auto pb-2 -mx-2 px-2
                snap-x snap-mandatory
                md:contents md:overflow-visible md:p-0 md:mx-0
              "
              aria-label="Customer testimonials"
            >
              {items.map((t, idx) => {
                const headline = t.note || "Great experience";
                const nameCar = t.name || "";
                const quote = t.quote || "";

                return (
                  <article
                    key={idx}
                    className="
                      snap-start shrink-0 w-[78%] sm:w-[48%]
                      md:w-auto md:shrink
                      rounded-[18px] border border-black/10 bg-white px-5 py-5
                    "
                  >
                    <header className="mb-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold text-[#1f2a2c] leading-tight">
                          {headline}
                        </h3>
                        <StarRow />
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-[#1f2a2c]/60">
                        {nameCar}
                      </p>
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
          </div>

          {/* small hint on mobile */}
          <p className="mt-4 text-center text-xs text-[#1f2a2c]/50 md:hidden">
            Swipe to see more reviews
          </p>
        </div>
      </div>
    </section>
  );
}
