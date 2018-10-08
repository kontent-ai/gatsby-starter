import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const Index = ({data}) => {
  const union = new Array(...data.allKenticoCloudItemBlogpostReference.edges, ...data.allKenticoCloudItemProjectReference.edges, ...data.allKenticoCloudItemSpeakingEngagement.edges);
  const items = union.map(({node}) => {
    if (node.fields !== undefined && node.fields !== null && node.fields.templateNameStep1 !== undefined && node.fields.templateNameStep1 !== null) {
      const name = node.fields.templateNameStep1 === 'project-reference' ? node.name___teaser_image__name.value : node.name.value;

      return (
        <li key={node.id}>
          <Link to={`../${node.fields.templateNameStep1}/${node.fields.slugStep1}`}>
            {name}
          </Link>
        </li>
      );
    } else {
      return (
        <li key={node.id}>
          <a href={node.url.value}>
            {node.name___teaser_image__name.value}
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
    allKenticoCloudItemBlogpostReference(filter: { fields: { languageStep1: { eq: "default" }}}) {
      edges {
        node {
          fields {
            languageStep1
          }
          id
          url {
            value
          }
          name___teaser_image__name {
            value
          }
        }
      }
    }
    allKenticoCloudItemProjectReference(filter: { fields: { languageStep1: { eq: "default" }}}) {
      edges {
        node {
          fields {
            templateNameStep1
            slugStep1
            languageStep1
          }
          id
          url {
            value
          }
          name___teaser_image__name {
            value
          }
        }
      }
    }
    allKenticoCloudItemSpeakingEngagement(filter: { fields: { languageStep1: { eq: "default" }}}) {
      edges {
        node {
          fields {
            templateNameStep1
            slugStep1
            languageStep1
          }
          id
          name {
            value
          }
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.object,
};