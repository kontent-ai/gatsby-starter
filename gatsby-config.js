module.exports = {
  siteMetadata: {
    title: `Gatsby starter site with Kentico Kontent`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@kentico/gatsby-source-kontent`,
      options: {
        deliveryClientConfig: {
          projectId: `479c94ca-8760-00f5-6b07-15d19b791204`,
          globalQueryConfig: {
            usePreviewMode: true,
          },
          previewApiKey: '<Preview Api Key>',
          typeResolvers: []
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
