//src/components/Seo.js

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import testimonialsData from "../data/testimonials.json";

const Seo = ({ title, description, image, pathname, children }) => {
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

  const siteUrl = siteMetadata.siteUrl;
  const defaultTitle = siteMetadata.title;
  const defaultDescription = siteMetadata.description;
  const defaultImage = "/images/og-zencarbuying.jpg";

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;

  const isAbsoluteUrl = image?.startsWith("http");
  const metaImage = isAbsoluteUrl 
    ? image 
    : `${siteUrl}${image || defaultImage}`;

  const url = `${siteUrl}${pathname || "/"}`;

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
    "sameAs": [
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
    review: testimonialsData.map((testimonial) => ({
      "@type": "Review",
      reviewBody: testimonial.quote,
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={pathname?.startsWith("/blog/") ? "article" : "website"} />
      <meta property="og:image" content={metaImage} />
      <meta
        property="og:image:alt"
        content="Zen Car Buying | Stress-Free Nationwide Concierge Service for New, Lightly Used & Luxury Cars"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:creator" content={siteMetadata.author} />

      {/* JSON-LD Schema for structured data */}
      <script type="application/ld+json">
        {JSON.stringify(globalSchema)}
      </script>

      {children}
    </>
  );
};

export default Seo;
