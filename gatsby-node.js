const path = require(`path`);
const kcItemTypeIdentifier = `KenticoCloudItem`;
const projectReferenceTypeIdentifier = `ProjectReference`;
const speakingEngagementTypeIdentifier = `SpeakingEngagement`;

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type.match(/KenticoCloudItem/)) {
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
        const union = new Array(...result.data.allKenticoCloudItemProjectReference.edges, ...result.data.allKenticoCloudItemSpeakingEngagement.edges);

        union.forEach(({ node }) => {
          if (node.fields !== undefined && node.fields !== null && node.fields.templateName !== undefined && node.fields.templateName !== null) {
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