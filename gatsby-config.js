require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Zen Car Buying | Stress-Free Concierge Service for New, Lightly Used & Luxury Cars`,
    description: `Zen Car Buying is your trusted concierge service for finding new cars, lightly used vehicles, and even luxury models at affordable prices nationwide. Our proven 4-step system ensures a stress-free car-buying experience.`,
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
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GATSBY_GOOGLE_GTAG_ID,
          process.env.GATSBY_GOOGLE_ADWORDS_ID,
        ],
        gtagConfig: {
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          exclude: [],
          delayOnRouteUpdate: 0,
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://zencarbuying.com",
        sitemap: "https://zencarbuying.com/sitemap-0.xml",
        resolveEnv: () => process.env.NETLIFY_ENV || process.env.NODE_ENV,
        env: {
          'production': {
            policy: [
              {
                userAgent: "*",
                allow: "/",
                disallow: [
                  '/0356516065660-tag-me',
                  '/0356516065660-untag-me'
                ]
              }
            ],
          },
          'branch-deploy': {
            policy: [{ userAgent: "*", disallow: "/" }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: "*", disallow: "/" }],
            sitemap: null,
            host: null,
          },
        },
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
            case '/terms-and-conditions/':
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
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
}
