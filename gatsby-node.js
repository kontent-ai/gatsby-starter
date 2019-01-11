const path = require(`path`);
const _ = require(`lodash`);
const kcItemTypeIdentifier = `KenticoCloudItem`;
const projectReferenceTypeIdentifier = `ProjectReference`;
const speakingEngagementTypeIdentifier = `SpeakingEngagement`;

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (_.has(node, `internal.type`) && _.isString(node.internal.type) && node.internal.type.startsWith(`KenticoCloudItem`)) {
    let withDetailView = false;
    let templateName;

    if (node.internal.type === `${kcItemTypeIdentifier}${projectReferenceTypeIdentifier}`) {
      templateName = `project-reference`;
      withDetailView = true;
    }
    else if (node.internal.type === `${kcItemTypeIdentifier}${speakingEngagementTypeIdentifier}`) {
      templateName = `speaking-engagement`;
      withDetailView = true;
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
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
    {
      allKenticoCloudItemBlogpostReference {
        edges {
          node {
            fields {
              language
            }
          }
        }
      }
      allKenticoCloudItemProjectReference {
        edges {
          node {
            fields {
              templateName
              slug
              language
            }
          }
        }
      }
      allKenticoCloudItemSpeakingEngagement {
        edges {
          node {
            fields {
              templateName
              slug
              language
            }
          }
        }
      }
    }
    `).then(result => {
        const union = result.data.allKenticoCloudItemProjectReference.edges.concat(result.data.allKenticoCloudItemSpeakingEngagement.edges);

        union.forEach(({ node }) => {
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