import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const Index = ({data}) => {
  const union = data.allKontentItemArticle.edges;

  const items = union.map(({node}) => {
    if (node.elements && node.elements !== null) {
      const name = node.elements.title.value;

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
          <a href={node.fields.slug}>
            {node.elements.teaser_image.name} (external)
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
    allKontentItemArticle(filter: {preferred_language: {eq: "en-US"}}) {
      edges {
        node {
          fields {
            templateName
            slug
          }
          id
          elements {
            title {
              value
            }
            teaser_image {
              name
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