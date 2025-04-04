import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, pathname, children }) => {
  const { site, logo } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        logo: file(relativePath: { eq: "zen-car-buying-logo.png" }) {
          publicURL
        }
      }
    `
  )

  const metaTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
  const logoUrl = `${site.siteMetadata.siteUrl}${logo.publicURL}`

  return (
    <>
      <title>{metaTitle}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metaDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={logoUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={logoUrl} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {children}
    </>
  )
}

export default Seo
