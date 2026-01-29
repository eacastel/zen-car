/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import './src/styles/globals.css'

export const onInitialClientRender = () => {
  if (typeof document === "undefined") return;
  document.body.style.overscrollBehavior = "auto";
  document.body.style.overscrollBehaviorY = "auto";
  document.documentElement.style.overscrollBehavior = "auto";
  document.documentElement.style.overscrollBehaviorY = "auto";
};