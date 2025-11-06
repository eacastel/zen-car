import React, { useMemo } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import testimonialsData from "../data/testimonials.json";
import Button from "../components/Button";

// Parse rating from number or "⭐⭐⭐⭐⭐"
const toNumberRating = (r) => {
  if (r == null) return null;
  if (typeof r === "number") return r;
  if (typeof r === "string") {
    const stars = (r.match(/⭐/g) || []).length;
    const num = Number(r);
    if (!Number.isNaN(num) && num > 0) return num;
    return stars || null;
  }
  return null;
};

// Small a11y-friendly star rating (yellow stars)
function StarRating({ value = 5, outOf = 5 }) {
  const stars = Array.from({ length: outOf }, (_, i) => i < value);
  return (
    <div className="flex" role="img" aria-label={`Rated ${value} out of ${outOf} stars`}>
      {stars.map((filled, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
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
  // Map testimonial.image substrings to GraphQL file images
  const imageMap = useMemo(() => {
    const map = new Map();
    data.allFile.edges.forEach(({ node }) => {
      map.set(node.name, getImage(node.childImageSharp.gatsbyImageData));
    });
    return map;
  }, [data]);

  // Compute aggregate rating from mixed formats
  const ratingNums = testimonialsData
    .map((t) => toNumberRating(t.rating))
    .filter((n) => typeof n === "number" && n > 0);
  const aggregateRating = ratingNums.length
    ? (ratingNums.reduce((a, b) => a + b, 0) / ratingNums.length).toFixed(1)
    : null;

  const orgId = "https://zencarbuying.com/#organization";

  // JSON-LD: Review list + optional AggregateRating
  const reviewItemsLd = testimonialsData.slice(0, 20).map((t, idx) => ({
    "@type": "Review",
    "author": { "@type": "Person", "name": t.name },
    "reviewBody": t.quote,
    ...(toNumberRating(t.rating)
      ? { "reviewRating": { "@type": "Rating", "ratingValue": String(toNumberRating(t.rating)), "bestRating": "5" } }
      : {}),
    "itemReviewed": { "@type": "LocalBusiness", "@id": orgId },
    "position": idx + 1
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": reviewItemsLd
  };

  if (aggregateRating) {
    schema.itemReviewed = {
      "@type": "LocalBusiness",
      "@id": orgId,
      "name": "Zen Car Buying – Car Buying Concierge Service",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": String(aggregateRating),
        "reviewCount": String(ratingNums.length),
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
              <StarRating value={Math.round(Number(aggregateRating))} />
              <span className="text-primary font-semibold">
                {aggregateRating}/5 · {ratingNums.length} reviews
              </span>
            </div>
          )}
        </header>

        {/* TOP CTA (services-style) */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to skip the stress and find your perfect car?
          </p>
          <Button to="/purchase/" size="lg" color="accent">
            Start Your Zen Journey
          </Button>
        </div>

        {/* Reviews grid */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonialsData.map((t, i) => {
            const key = t.image ? t.image.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "") : null;
            const image = key ? imageMap.get(key) : null;
            const numericRating = toNumberRating(t.rating);

            return (
              <article key={i} className="bg-white border border-secondary rounded-lg shadow-md p-6 h-full flex flex-col">
                {image && (
                  <div className="mb-4 rounded-md overflow-hidden">
                    <GatsbyImage image={image} alt={`Photo for ${t.name}`} />
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
                  {numericRating ? <StarRating value={numericRating} /> : null}
                </div>

                {(t.location || t.date) && (
                  <div className="mt-2 text-xs text-primary/60">
                    {t.location ? <span>{t.location}</span> : null}
                    {t.location && t.date ? " · " : null}
                    {t.date ? <span>{t.date}</span> : null}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {/* BOTTOM CTA (services-style) */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to skip the stress and find your perfect car?
          </p>
          <Button to="/purchase/" size="lg" color="accent">
            Start Your Zen Journey
          </Button>
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

export const Head = ({ location }) => {
  const siteUrl = "https://zencarbuying.com";
  const title = "Customer Reviews | Zen Car Buying";
  const description =
    "Real reviews from drivers who used Zen Car Buying to find reliable, fairly-priced cars without dealership hassle.";

  // Optional: compute real average rating (from mixed formats)
  const ratings = testimonialsData.map((t) => toNumberRating(t.rating)).filter(Boolean);
  const avg = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : "5.0";

  const itemList = testimonialsData.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      "@id": `${siteUrl}/reviews/#review-${i + 1}`,
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.name },
      ...(toNumberRating(t.rating)
        ? {
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(toNumberRating(t.rating)),
              bestRating: "5",
              worstRating: "1",
            },
          }
        : {}),
      itemReviewed: {
        "@type": "Organization",
        name: "Zen Car Buying",
        url: siteUrl,
      },
    },
  }));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/reviews/#webpage`,
    name: title,
    url: `${siteUrl}/reviews/`,
    description,
    mainEntity: {
      "@type": "ItemList",
      name: "Zen Car Buying Customer Reviews",
      itemListElement: itemList,
      numberOfItems: testimonialsData.length,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg,
      reviewCount: testimonialsData.length,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <Seo
        title={title}
        description={description}
        pathname={location?.pathname || "/reviews/"}
        image="https://zencarbuying.com/images/og-zencarbuying.jpg"
      />
      <script type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </script>
    </>
  );
};
