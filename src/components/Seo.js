import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, pathname, children }) => {
  const { site } = useStaticQuery(
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
      }
    `
  )

  const metaTitle = title || site.siteMetadata.title
  const metaDescription = description || site.siteMetadata.description
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

  return (
    <>
      <title>{metaTitle}</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {children}
    </>
  )
}

export default Seo
