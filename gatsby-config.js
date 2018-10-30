module.exports = {
  siteMetadata: {
    title: `Gatsby starter site with Kentico Cloud`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-kentico-cloud`,
      options: {
        deliveryClientConfig: {
          projectId: `c461ba35-fd9d-000f-17ed-2054c3a4cbf1`,
        },
        languageCodenames: [
          `en-US`
        ]
      }
    }
  ]
};
