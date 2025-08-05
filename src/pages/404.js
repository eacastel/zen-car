import React from "react";
import { Link, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { getHomePath } from "../utils/getHomePath";

export default function NotFoundPage({ data }) {
  const raceCarImage = getImage(data.raceCar);

  return (
    <Layout>
      <div className="relative h-screen flex flex-col">
        {/* Hero Image */}
        <GatsbyImage
          image={raceCarImage}
          alt="Race car with road ends sign"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay with Text */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-2xl bg-white bg-opacity-95 p-8 rounded-lg shadow-lg">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              Road Ends Ahead
            </h1>
            <p className="text-lg text-secondary mb-6">
              It seems you've driven off the map. Let's get you back on track!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={getHomePath()}
                className="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition"
              >
                Back to Home
              </Link>

              <Link
                to="/blog/"
                className="px-6 py-3 bg-accent text-white rounded-lg shadow-md hover:bg-accent-dark transition"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>

        {/* Footer pushed to bottom */}
        <footer className="mt-auto w-full text-center py-4 text-secondary bg-primary">
          © {new Date().getFullYear()} Zen Car Buying. All rights reserved.
        </footer>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <Seo
    title="404 - Page Not Found"
    description="The road ends here! Navigate back to our homepage or check out our latest blog posts."
    pathname="/404/"
  />
);

// GraphQL Image Query
export const query = graphql`
  query {
    raceCar: file(relativePath: { eq: "road-ends-404.png" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`;
