/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

export const onClientEntry = () => {
    if (typeof window !== "undefined" && !document.querySelector("#calendlyScript")) {
      const script = document.createElement("script");
      script.id = "calendlyScript";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  };
  