module.exports = {
  siteMetadata: {
    title: `Gatsby starter site with Kentico Cloud`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        deliveryClientConfig: {
          projectId: `5ac93d1e-567d-01e6-e3b7-ac435f77b907`,
        },
        languageCodenames: [
          `default`,
          `de-DE`,
          `cs-CZ`,
        ]
      }
    }
  ]
};
