const path = require(`path`);
const _ = require(`lodash`);
const { getKontentItemNodeTypeName } = require('@kontent-ai/gatsby-source');
const articleTypeIdentifier = `article`;

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  let withDetailView = false;
  let templateName;

  const type = _.get(node, `internal.type`, '');
  if (type.startsWith(getKontentItemNodeTypeName(articleTypeIdentifier))) {
    templateName = `article`;
    withDetailView = true;
  } else {
    return;
  }

  if (withDetailView) {
    createNodeField({
      node,
      name: `templateName`,
      value: templateName
    });

    createNodeField({
      node,
      name: `slug`,
      value: node.elements.url_pattern.value
    });
  }

  createNodeField({
    node,
    name: `language`,
    value: node.system.language
  });

};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve) => {
    graphql(`
    {
      allKontentItemArticle (filter: {preferred_language: {eq: "en-US"}}) {
        nodes {
          fields {
            templateName
            slug
            language
          }
          elements {
            title {
              name
              value
            }
          }
        }
      }
    }`).then(result => {
      const union = result.data.allKontentItemArticle.nodes;

      union.forEach((node) => {
        if (_.has(node, `fields.templateName`) && !_.isNil(node.fields.templateName)) {
          createPage({
            path: `${node.fields.templateName}/${node.fields.slug}`,
            component: path.resolve(`./src/templates/${node.fields.templateName}.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              templateName: node.fields.templateName,
              slug: node.fields.slug,
              language: node.fields.language
            },
          });
        }
      });
      resolve();
    });
  });
};