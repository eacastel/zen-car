module.exports = {
  siteMetadata: {
    title: `Zen Car Buying`,
    description: `Discover incredible deals on lightly used cars.`,
    author: `@zencar`,
    siteUrl: `https://zencarbuying.com`
  },
  flags: {
    THE_FLAG: false
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
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
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
        head: false,
        anonymize: true,
        respectDNT: true,
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "zencarbuying.com",
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
