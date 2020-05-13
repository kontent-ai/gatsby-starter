import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const Index = ({data}) => {
  const union = data.allKontentItemBlogpostReference.edges.concat(data.allKontentItemProjectReference.edges).concat(data.allKontentItemSpeakingEngagement.edges);

  const items = union.map(({node}) => {
    if (node.fields && node.fields !== null && node.fields.templateName && node.fields.templateName !== null) {
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
            {node.elements.name___teaser_image__name.value} (external)
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
    allKontentItemBlogpostReference(filter: {preferred_language: {eq: "default"}}) {
      edges {
        node {
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
    allKontentItemProjectReference(filter: {preferred_language: {eq: "default"}}) {
      edges {
        node {
          fields {
            templateName
            slug
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
    allKontentItemSpeakingEngagement(filter: {preferred_language: {eq: "default"}}) {
      edges {
        node {
          fields {
            templateName
            slug
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