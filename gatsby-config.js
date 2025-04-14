require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Zen Car Buying | Expert Help for Lightly Used & Luxury Cars`,
    description: `Zen Car Buying is your expert concierge for finding lightly used cars, luxury vehicles, and affordable deals nationwide. We simplify the process with a 4-step stress-free car buying system.`,
    author: `@zencarbuying`,
    siteUrl: `https://zencarbuying.com`
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ["webp", "png"], 
          placeholder: "blurred",
          quality: 90,
          breakpoints: [1080, 1366, 1920],
        },
        failOn: "none",
        base64Width: 20,
        forceBase64Format: "png",
        useMozJpeg: false, 
        stripMetadata: true,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        useNameForId: false,
        host: `cdn.contentful.com`,
        enableTags: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [
            require(`tailwindcss`),
            require(`autoprefixer`),
          ],
        },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zen Car Buying`,
        short_name: `ZenCar`,
        start_url: `/`,
        background_color: `#6B8385`, 
        theme_color: `#F99F1B`, 
        display: `minimal-ui`,
        icon: `src/images/zen-car-buying-logo.png`, 
        include_favicon: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GATSBY_GOOGLE_GTAG_ID],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: [],
          delayOnRouteUpdate: 2000,
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://zencarbuying.com",
        sitemap: "https://zencarbuying.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          skipWaiting: false,
          clientsClaim: false,
        },
        precachePages: [], 
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/`,  // <- puts sitemap.xml at root directly
        entryLimit: 5000, // ensure a single sitemap.xml
        createLinkInHead: true,

        // Use built-in Gatsby page data, no custom query
        resolveSiteUrl: () => `https://zencarbuying.com`,

        serialize: ({ path }) => {
          // Exclude any invalid or "undefined" paths explicitly
          if (!path || path.includes('undefined')) return null;

          // Set custom priorities per specific pages
          let priority = 0.7;

          switch (path) {
            case '/':
              priority = 1.0; break;         // Home page
            case '/pricing/':
              priority = 0.9; break;         // Pricing page
            case '/about/':
              priority = 0.9; break;         // About page
            case '/faq/':
              priority = 0.8; break;         // FAQ page
            case '/contact/':
              priority = 0.8; break;         // Contact page
            case '/blog/':
              priority = 0.8; break;         // Blog page
            case '/privacy-policy/':
            case '/terms/':
              priority = 0.5; break;         // Legal pages lower priority
            default:
              priority = 0.7;                // Default priority for all others
          }

          return {
            url: `https://zencarbuying.com${path}`,
            changefreq: `weekly`,
            priority,
          };
        },
      },
    },
  ],
}
