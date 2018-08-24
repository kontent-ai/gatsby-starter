const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Kentico Cloud Gatsby sample app: Personal Portfolio',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-kentico-cloud',
      options: {
        kcDeliveryEndpointUrl: "https://deliver.kenticocloud.com",
        kcProjectId: '5ac93d1e-567d-01e6-e3b7-ac435f77b907',
        kcLanguageCodenames: [
          "default",
          "de-DE"
        ],
        queryConfig: {
          usePreviewMode: false,
          linkResolver: link => {
            if (link.type === 'mvp') {
              return `/mvp/${urlSlug}`;
            }
          },
          richTextResolver: item => {
            if (item.system.type == 'actor') {
              return `<a href="/mvp/${item.urlSlug}">${item.name}</a>`;
            }
          }
        }
      }
    }
  ]
}