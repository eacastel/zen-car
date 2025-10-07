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
        className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 pt-8 pb-16 max-w-[900px]"
        aria-labelledby="page-title"
        itemScope
        itemType="https://schema.org/Blog"
      >
        <h1
          id="page-title"
          className="text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-12"
        >
          Latest Articles
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" role="list">
          {posts.map((post) => {
            const featureImage = getImage(post.featureImage);
            const url = `/blog/${post.slug}/`; // ensure trailing slash
            return (
              <article
                key={post.slug}
                className="block p-8 border border-secondary bg-secondary rounded-lg shadow-md transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                role="listitem"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <Link to={url} aria-label={`Read article: ${post.title}`} itemProp="url">
                  {featureImage && (
                    <div className="flex justify-center mb-4">
                      <GatsbyImage
                        image={featureImage}
                        alt={post.featureImage?.title || post.title}
                        className="rounded-md"
                      />
                    </div>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold text-primary hover:text-accent text-left" itemProp="headline">
                    {post.title}
                  </h2>
                  <p className="text-base md:text-lg text-primary leading-relaxed text-left mt-2" itemProp="description">
                    {post.excerpt}
                  </p>
                  <meta itemProp="datePublished" content={post.date} />
                  <meta itemProp="mainEntityOfPage" content={`https://zencarbuying.com${url}`} />
                </Link>
              </article>
            );
          })}
        </div>
      </main>

      <CallToAction />
    </Layout>
  );
};


export const query = graphql`
  query BlogPageQuery {
    allContentfulBlogPost(sort: { date: DESC }) {
      nodes {
        title
        slug
        excerpt
        date(formatString: "YYYY-MM-DD")
        featureImage {
          gatsbyImageData(layout: CONSTRAINED, width: 600, height: 300, placeholder: BLURRED)
          title
        }
      }
    }
  }
`;

export default BlogPage;


export const Head = ({ location }) => (
  <>
    <Seo
      title="Used Car Buying Tips & Guides | Zen Car Buying Blog"
      description="Explore expert car buying tips, market insights, and strategies from Zen Car Buying. Learn how to save on used cars, understand financing, warranties, and more."
      pathname={location.pathname}
    />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Zen Car Buying Blog",
        description: "Used car buying strategies, cost-saving guides, and expert advice from Zen Car Buying.",
        url: "https://zencarbuying.com/blog/",
        publisher: {
          "@type": "Organization",
          name: "Zen Car Buying",
          url: "https://zencarbuying.com"
        }
      })}
    </script>
  </>
);