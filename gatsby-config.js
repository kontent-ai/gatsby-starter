require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Gatsby starter site with Kontent.ai`,
  },
  plugins: [
    // once https://github.com/gatsbyjs/gatsby/discussions/35841 is released replace with embedded API
    // currently it is not possible to use GraphQL data there
    `gatsby-plugin-react-helmet`,
    {
      resolve: '@kontent-ai/gatsby-source',
      options: {
        projectId: process.env.KONTENT_PROJECT_ID, // Fill in your Project ID
        // if false used authorization key for secured API
        usePreviewUrl: process.env.KONTENT_PREVIEW_ENABLED && process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true',
        authorizationKey: process.env.KONTENT_PREVIEW_ENABLED && process.env.KONTENT_PREVIEW_ENABLED.toLowerCase() === 'true'
          ? process.env.KONTENT_PREVIEW_KEY
          : undefined,
        languageCodenames: process.env.KONTENT_LANGUAGE_CODENAMES.split(',').map(lang => lang.trim()),
      },
    },
  ]
};
