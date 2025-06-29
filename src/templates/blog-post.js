import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import CallToAction from "../components/CallToAction"
import Seo from "../components/Seo"

const BlogPost = ({ data }) => {
  const { title, body, metadata, featureImage } = data.contentfulBlogPost
  const tags = metadata?.tags || []
  const blogDisplayImage = getImage(featureImage?.displayImage);
  const relatedPosts = data.allContentfulBlogPost.nodes

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <article className="prose mx-auto lg:col-span-2 px-4 md:px-8 py-8  border border-secondary bg-secondary rounded-lg shadow-md">
          <header className="border-b border-primary/20 pb-2 mb-4">
            <h1
              className="text-4xl md:text-5xl font-poppins mb-2 leading-8 text-primary"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {title}
            </h1>
          </header>

          {/* Feature Image */}
          {blogDisplayImage && (
            <GatsbyImage
              image={blogDisplayImage}
              alt={featureImage?.title || "Blog post image"}
              className="rounded-lg mb-6 shadow-md"
            />
          )}

          <section className="text-lg text-primary space-y-6">
            {documentToReactComponents(JSON.parse(body.raw))}
          </section>

          {tags.length > 0 && (
            <footer className="mt-10 pt-4 border-t border-primary">
              <h2 className="text-xl font-semibold text-primary mb-3">Tags:</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <Link
                    key={i}
                    to={`/tag/${tag.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-accent text-white text-xs rounded-lg shadow-md hover:bg-accent-dark font-pirulen"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </footer>
          )}
        </article>

        {/* Right Sidebar */}
        <aside className="space-y-6 border border-secondary bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-accent">Related Articles</h2>
          <ul className="space-y-4">
            {relatedPosts.map((post, index) => (
              <li key={index} className="border-b border-secondary pb-4">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-lg text-primary font-bold hover:text-accent"
                >
                  {post.title}
                </Link>
                <p className="text-sm text-primary mt-1">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <CallToAction />
    </Layout>
  )
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM DD, YYYY")
      body {
        raw
      }
      metadata {
        tags {
          name
        }
      }
      featureImage {
        title
        displayImage: gatsbyImageData(
          layout: CONSTRAINED
          width: 800
          placeholder: BLURRED
        )
        ogImage: gatsbyImageData(
          layout: FIXED
          width: 1200
          height: 630
          formats: [JPG]
          placeholder: NONE
        )
      }
    allContentfulBlogPost(limit: 5) {
      nodes {
        title
        slug
        excerpt
      }
    }
  }
`

export default BlogPost

export const Head = ({ data, location }) => {
  const { title, excerpt, featureImage } = data.contentfulBlogPost
  const ogImageSrc = featureImage?.ogImage?.images?.fallback?.src;
  const image = ogImageSrc?.startsWith("http")
    ? ogImageSrc
    : `https://zencarbuying.com${ogImageSrc || "/images/og-zencarbuying.jpg"}`
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": location.href,
    },
    headline: title,
    description: excerpt,
    ...(image && { image }),
    publisher: {
      "@type": "Organization",
      name: "Zen Car Buying",
      url: "https://zencarbuying.com",
      logo: {
        "@type": "ImageObject",
        url: "https://zencarbuying.com/icons/icon-512x512.png",
      },
    },
  }

  return (
    <Seo
      title={title}
      description={excerpt}
      pathname={location.pathname}
      image={image}
    >
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Seo>
  )
}
