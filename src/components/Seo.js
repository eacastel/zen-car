import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import testimonialsData from "../data/testimonials.json";

const Seo = ({ title, description, image, pathname = "/", robots = "index,  follow", schemaMarkup, children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);

  const coerceRating = (val) => {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    // try digit first
    const digits = val.match(/\d+(\.\d+)?/);
    if (digits) return Number(digits[0]);
    // then count stars
    const stars = (val.match(/⭐/g) || []).length;
    if (stars) return stars;
  }
  return 5; // default
};

  // Ensure no trailing slash on siteUrl
  const rawSiteUrl = siteMetadata.siteUrl || "";
  const siteUrl = rawSiteUrl.endsWith("/") ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

  const defaultTitle = siteMetadata.title;
  const defaultDescription = siteMetadata.description;
  const defaultImage = "/images/og-zencarbuying.jpg";

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;

  const metaImage =
    image?.startsWith("http") || image?.startsWith("//")
      ? image
      : `${siteUrl}${image || defaultImage}`;
      

  // Canonical with trailing slash normalization
  const canonicalPath = pathname === "/" ? "/" : pathname.endsWith("/") ? pathname : `${pathname}/`;
  const url = `${siteUrl}${canonicalPath}`;

  const globalSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Zen Car Buying",
    description: defaultDescription,
    url: siteUrl,
    logo: `${siteUrl}/zen-car-buying-logo.png`,
    image: metaImage,
    priceRange: "$$",
    areaServed: "US",
    availableChannel: "Online",
    serviceType: "Car Buying Concierge",
    sameAs: [
      "https://www.facebook.com/zencarbuying",
      "https://www.linkedin.com/company/zencarbuying",
      "https://www.yelp.com/biz/zencarbuying"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonialsData.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonialsData.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(coerceRating(t.rating)),
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={robots} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={canonicalPath.startsWith("/blog/") ? "article" : "website"} />
      <meta property="og:image" content={metaImage} />
      <meta
        property="og:image:alt"
        content="Zen Car Buying | Stress-Free Nationwide Concierge Service for New, Lightly Used & Luxury Cars"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:creator" content={siteMetadata.author} />

      <script type="application/ld+json">{JSON.stringify(globalSchema)}</script>
      
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
          </script>
      )}

      {children}
    </>
  );
};

export default Seo;
