/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import * as React from "react"

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
  setHeadComponents([
    <script
      key="cookieyes"
      id="cookieyes"
      type="text/javascript"
      src="https://cdn-cookieyes.com/client_data/8c59c8ad81a02c384705b628/script.js"
      defer
    />,
    <link
      key="calendly-css"
      rel="stylesheet"
      href="https://assets.calendly.com/assets/external/widget.css"
    />,
    <script
      key="calendly-js"
      src="https://assets.calendly.com/assets/external/widget.js"
      async
    />,
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
