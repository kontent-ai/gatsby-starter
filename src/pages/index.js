import React from 'react';
import Link from 'gatsby-link';

export default ({ data }) => {
  const union = new Array(...data.allKenticoCloudItemBlogpostReference.edges, ...data.allKenticoCloudItemProjectReference.edges, ...data.allKenticoCloudItemSpeakingEngagement.edges)
  const items = union.map(({ node }) => {
    if (node.fields !== undefined && node.fields !== null && node.fields.templateNameStep1 !== undefined && node.fields.templateNameStep1 !== null) {
      return (
        <li key={node.system.id}>
          <Link to={`../${node.fields.templateNameStep1}/${node.fields.slugStep1}`}>
            {node.system.name}
          </Link>
        </li>);
    }
    else {
      return (
        <li key={node.system.id}>
          <a href={node.url.value}>
            {node.system.name}
          </a>
        </li>);
    }
  });

  return (
    <div>
      {items}
    </div>
  );
}

export const query = graphql`
  query AllItemsQuery {
    allKenticoCloudItemBlogpostReference {
      edges {
        node {
          system {
            id
            name
          }
          url {
            value
          }
        }
      }
    }
    allKenticoCloudItemProjectReference {
      edges {
        node {
          fields {
            templateNameStep1
            slugStep1
          }
          system {
            id
            name
          }
          url {
            value
          }
        }
      }
    }
    allKenticoCloudItemSpeakingEngagement {
      edges {
        node {
          fields {
            templateNameStep1
            slugStep1
          }
          system {
            id
            name
          }
        }
      }
    }
  }
`