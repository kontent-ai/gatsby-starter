module.exports = {
  siteMetadata: {
    title: 'Gatsby starter site with Kentico Cloud',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-kentico-cloud',
      options: {
        kcDeliveryEndpointUrl: 'https://deliver.kenticocloud.com',
        kcProjectId: '5ac93d1e-567d-01e6-e3b7-ac435f77b907',
        kcLanguageCodenames: [
          'default',
          'de-DE',
          'cs-CZ',
        ],
        queryConfig: {
          usePreviewMode: false,
        },
      },
    },
  ],
};
