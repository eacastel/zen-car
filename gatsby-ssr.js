/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import * as React from "react"

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes, setPreBodyComponents, setPostBodyComponents }) => {
  setHtmlAttributes({ lang: 'en' });
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
    <script
      key="fbq-init"
      defer
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.defer=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1211874510591693');
          fbq('track', 'PageView');
        `,
      }}
    />,
    <script
      key="gtm-script"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W2LQ7S42');`,
      }}
    />,
  ]);
  setPreBodyComponents([
    <noscript
      key="gtm-noscript"
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W2LQ7S42"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />,
  ]);
  setPostBodyComponents([
    <noscript key="fbq-noscript">
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=1211874510591693&ev=PageView&noscript=1"
        alt="Meta Pixel"
      />
    </noscript>,
  ]);
}
