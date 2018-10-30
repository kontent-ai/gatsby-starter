import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const Index = ({data}) => {
  const union = new Array(...data.allKenticoCloudItemBlogpostReference.edges, ...data.allKenticoCloudItemProjectReference.edges, ...data.allKenticoCloudItemSpeakingEngagement.edges);
  const items = union.map(({node}) => {
    if (node.fields !== undefined && node.fields !== null && node.fields.templateName !== undefined && node.fields.templateName !== null) {
      const name = node.fields.templateName === `project-reference` ? node.elements.name___teaser_image__name.value : node.elements.name.value;

      return (
        <li key={node.id}>
          <Link to={`../${node.fields.templateName}/${node.fields.slug}`}>
            {name}
          </Link>
        </li>
      );
    } else {
      return (
        <li key={node.id}>
          <a href={node.elements.url.value}>
            {node.elements.name___teaser_image__name.value}
          </a>
        </li>
      );
    }
  });

  return (
    <Layout>
      <div>
        {items}
      </div>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  {
    allKenticoCloudItemBlogpostReference(filter: { fields: { language: { eq: "default" }}}) {
      edges {
        node {
          fields {
            language
          }
          id
          elements {
            url {
              value
            }
            name___teaser_image__name {
              value
            }
          }
        }
      }
    }
    allKenticoCloudItemProjectReference(filter: { fields: { language: { eq: "default" }}}) {
      edges {
        node {
          fields {
            templateName
            slug
            language
          }
          id
          elements {
            url {
              value
            }
            name___teaser_image__name {
              value
            }
          }
        }
      }
    }
    allKenticoCloudItemSpeakingEngagement(filter: { fields: { language: { eq: "default" }}}) {
      edges {
        node {
          fields {
            templateName
            slug
            language
          }
          id
          elements {
            name {
              value
            }
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.object,
};