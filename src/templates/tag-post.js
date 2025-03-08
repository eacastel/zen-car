import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const TagPost = ({ pageContext }) => {
  const { tagName, relatedPosts = [] } = pageContext;

  return (
    <Layout>
      <main className="container mx-auto px-6 md:px-12 lg:px-24 xl:px-32 py-8">
        <h1 className="text-4xl font-bold text-primary mb-6">Posts tagged: {tagName}</h1>

        {relatedPosts.length === 0 ? (
          <p className="text-secondary italic">No posts found for this tag.</p>
        ) : (
          <ul className="space-y-4">
            {relatedPosts.map((slug, i) => (
              <li key={i}>
                <Link
                  to={`/blog/${slug}`}
                  className="block p-4 border border-primary rounded-lg bg-secondary hover:bg-accent hover:text-white"
                >
                  {slug.replace("-", " ").toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </Layout>
  );
};

export default TagPost;
