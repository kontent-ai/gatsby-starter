const path = require(`path`);
const _ = require(`lodash`);
const { getKontentItemNodeTypeName } = require('@kentico/gatsby-source-kontent');
const projectReferenceTypeIdentifier = `project_reference`;
const speakingEngagementTypeIdentifier = `speaking_engagement`;

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  let withDetailView = false;
  let templateName;

  const type = _.get(node, `internal.type`, '');
  if (type.startsWith(getKontentItemNodeTypeName(projectReferenceTypeIdentifier))) {
    templateName = `project-reference`;
    withDetailView = true;
  } else  if (type.startsWith(getKontentItemNodeTypeName(speakingEngagementTypeIdentifier))) {
    templateName = `speaking-engagement`;
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
      value: node.elements.url_slug.value
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
      allKontentItemProjectReference (filter: {preferred_language: {eq: "default"}}) {
        nodes {
          fields {
            templateName
            slug
            language
          }
        }
      }
      allKontentItemSpeakingEngagement (filter: {preferred_language: {eq: "default"}}){
        nodes {
          fields {
            templateName
            slug
            language
          }
        }
      }
    }
    `).then(result => {
      const union = result.data.allKontentItemProjectReference.nodes.concat(result.data.allKontentItemSpeakingEngagement.nodes);

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