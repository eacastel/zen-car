import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import CallToAction from "../components/CallToAction";
import Seo from "../components/Seo";

const BlogPage = ({ data }) => {
  const posts = data.allContentfulBlogPost.nodes;

  return (
    <Layout>
      <main
        className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32 py-8"
        aria-labelledby="page-title"
      >
      <h1
          id="page-title"
          className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-12"
        >
          Latest Articles
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
        >
          {posts.map((post) => {
            const featureImage = getImage(post.featureImage);

            return (
              <Link
                to={`/blog/${post.slug}`}
                key={post.slug}
                className="block p-6 border border-secondary bg-secondary rounded-lg shadow-md transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                role="listitem"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                {featureImage && (
                  <GatsbyImage
                    image={featureImage}
                    alt={post.featureImage?.title || post.title}
                    className="rounded-md mb-4"
                  />
                )}

                <h2
                  className="text-xl font-bold text-primary hover:text-accent"
                  itemProp="headline"
                >
                  {post.title}
                </h2>

                <p className="text-sm text-primary mt-2" itemProp="description">
                  {post.excerpt}
                </p>

                <meta itemProp="url" content={`/blog/${post.slug}`} />
              </Link>
            );
          })}
        </div>
      </main>
      <CallToAction />
    </Layout>
  );
};

export const Head = ({ location }) => (
    <Seo
      title="Latest Articles - Zen Car Buying"
      description="Discover expert tips, car buying strategies, and industry insights on the Zen Car Buying blog. Stay informed and make smarter vehicle purchases."
      pathname={location.pathname}  // Ensures canonical URLs are dynamic
      schemaMarkup={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Zen Car Buying Blog",
        "description":
          "Expert advice and guides to help you make informed car buying decisions.",
        "url": "https://zencarbuying.com/blog",
        "publisher": {
          "@type": "Organization",
          "name": "Zen Car Buying",
          "url": "https://zencarbuying.com"
        }
      }}
    />
  );

export const query = graphql`
  query BlogPageQuery {
    allContentfulBlogPost(sort: { date: DESC }) {
      nodes {
        title
        slug
        excerpt
        featureImage {
          gatsbyImageData(layout: CONSTRAINED, width: 400, height:200, placeholder: BLURRED)
          title
        }
      }
    }
  }
`;

export default BlogPage;
