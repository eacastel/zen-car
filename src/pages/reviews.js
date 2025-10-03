import React, { useMemo } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import testimonialsData from "../data/testimonials.json";
import CalendlyButton from "../components/CalendlyButton";


// Small a11y-friendly star rating
function StarRating({ value = 5, outOf = 5 }) {
  const stars = Array.from({ length: outOf }, (_, i) => i < value);
  return (
    <div className="flex" role="img" aria-label={`Rated ${value} out of ${outOf} stars`}>
      {stars.map((filled, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${filled ? "text-accent" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.036a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118L10.95 13.79a1 1 0 00-1.175 0l-2.435 1.784c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L3.705 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage({ data }) {
  // Map testimonial.image substrings to GraphQL file images (same approach as your slider)
  const imageMap = useMemo(() => {
    const map = new Map();
    data.allFile.edges.forEach(({ node }) => {
      map.set(node.name, getImage(node.childImageSharp.gatsbyImageData));
    });
    return map;
  }, [data]);

  // Compute aggregate rating if ratings exist
  const ratings = testimonialsData
    .map(t => Number(t.rating))
    .filter(n => !Number.isNaN(n) && n > 0);
  const aggregateRating = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : null;


  // JSON-LD: Review list + optional AggregateRating
  const reviewItemsLd = testimonialsData.slice(0, 20).map((t, idx) => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": t.name },
    "reviewBody": t.quote,
    ...(t.rating ? {
      "reviewRating": { "@type": "Rating", "ratingValue": String(t.rating), "bestRating": "5" }
    } : {}),
    "itemReviewed": { "@type": "Service", "name": "Zen Car Buying – Car Buying Concierge Service" },
    "position": idx + 1
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": reviewItemsLd
  };

  if (aggregateRating) {
    schema.itemReviewed = {
      "@type": "Service",
      "name": "Zen Car Buying – Car Buying Concierge Service",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(aggregateRating),
        "reviewCount": String(ratings.length),
        "bestRating": "5"
      }
    };
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32 py-12">
        <header className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-poppins text-primary mb-4">
            Reviews from Zen Car Buying Clients
          </h1>
          <p className="text-lg text-primary/90">
            Real stories from drivers we helped find the right car at the right price.
          </p>
          {aggregateRating && (
            <div className="mt-4 flex items-center gap-3">
              <StarRating value={Math.round(aggregateRating)} />
              <span className="text-primary font-semibold">
                {aggregateRating}/5 · {ratings.length} reviews
              </span>
            </div>
          )}
        </header>

        {/* CTA Bar */}
{/* CTA Bar */}
<div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
  <CalendlyButton size="lg" color="accent" to="/15min">
    Schedule a Free Consultation
  </CalendlyButton>
          <span className="text-sm text-primary/70">No pressure. We’ll give you options and real pricing.</span>
        </div>

        {/* Reviews grid */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonialsData.map((t, i) => {
            // find image by substring match (same pattern you used)
            const key = t.image ? t.image.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "") : null;
            const image = key ? imageMap.get(key) : null;
            return (
              <article key={i} className="bg-white border border-secondary rounded-lg shadow-md p-6 h-full flex flex-col">
                {image && (
                  <div className="mb-4 rounded-md overflow-hidden">
                    <GatsbyImage image={image} alt={`Photo of ${t.name}`} />
                  </div>
                )}

                {t.note && (
                  <div className="px-2 mb-2 text-accent font-pirulen tracking-widest text-md font-bold uppercase">
                    {t.note}
                  </div>
                )}

                <blockquote className="text-primary/90 italic">“{t.quote}”</blockquote>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-primary font-semibold">{t.name}</div>
                  {t.rating ? <StarRating value={Number(t.rating)} /> : null}
                </div>

                {/* Optional source/date line */}
                {(t.source || t.date) && (
                  <div className="mt-2 text-xs text-primary/60">
                    {t.source ? <span>Source: {t.source}</span> : null}
                    {t.source && t.date ? " · " : null}
                    {t.date ? <span>{t.date}</span> : null}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
  <CalendlyButton size="lg" color="accent" to="/15min">
    Schedule a Free Consultation
  </CalendlyButton>
          <p className="mt-2 text-sm text-primary/70">We’ll pull inventory and pricing for your short-list.</p>
        </div>

        {/* Review schema */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ReviewsImages {
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      edges {
        node {
          childImageSharp {
            gatsbyImageData(
              width: 800
              height: 533
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              transformOptions: { cropFocus: CENTER }
            )
          }
          name
        }
      }
    }
  }
`;

// SEO
export const Head = () => {
  const title = "Customer Reviews | Zen Car Buying";
  const description = "Real reviews from drivers who used Zen Car Buying to find reliable, fairly-priced cars without dealership hassle.";
  return (
    <Seo
      title={title}
      description={description}
      pathname="/reviews/"
      image="https://zencarbuying.com/images/og-zencarbuying.jpg"
    />
  );
};
