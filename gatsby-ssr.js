/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import * as React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/Pirulen-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PirulenFont"
    />,
    <link
      rel="preload"
      href="/fonts/Poppins-Regular.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PoppinsRegularFont"
    />,
    <link
      rel="preload"
      href="/fonts/Poppins-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PoppinsBoldFont"
    />,
    <link
      rel="preload"
      href="/fonts/Poppins-Light.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="PoppinsLightFont"
    />,
    <link
      rel="preload"
      href="/fonts/helvetica-light-oblique.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
      key="HelveticaFont"
    />,
  ])
}
