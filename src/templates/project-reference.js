import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const ProjectReference = ({data}) => {
  const item = data.kenticoCloudItemProjectReference;
  return (
    <Layout>
      <div>
        <img src={item.elements.name___teaser_image__teaser_image.value[0].url} />
          <table>
            <tbody>
            <tr>
              <th>Name:</th>
              <td>{item.elements.name___teaser_image__name.value}</td>
            </tr>
            <tr>
              <th>URL:</th>
              <td>{item.elements.url.value}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{item.elements.started_at.value ? item.elements.started_at.value : `Unknown starting date`} &ndash; {item.elements.finished_at.value ? item.elements.finished_at.value : `until now`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProjectReference;

export const query = graphql`
  query projectReferenceQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    kenticoCloudItemProjectReference(fields: { slug: { eq: $slug }}) {
      system {
        name
      }
      elements {
        name___teaser_image__teaser_image {
          value {
            url
          }
        }
        name___teaser_image__name {
          value
        }
        url {
          value
        }
        started_at {
          value
        }
        finished_at {
          value
        }
      }
    }
  }
`;

ProjectReference.propTypes = {
  data: PropTypes.object,
};
