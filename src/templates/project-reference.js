import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const ProjectReference = ({data}) => {
  const item = data.kenticoCloudItemProjectReference;
  return (
    <Layout>
      <div>
        <img src={item.name___teaser_image__teaser_image.assets[0].url} />
          <table>
            <tbody>
            <tr>
              <th>Name:</th>
              <td>{item.name___teaser_image__name.value}</td>
            </tr>
            <tr>
              <th>URL:</th>
              <td>{item.url.value}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{item.started_at.datetime} &ndash; {item.finished_at.datetime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProjectReference;

export const query = graphql`
  query projectReferenceQuery($slugStep2: String!) {
    site {
      siteMetadata {
        title
      }
    }
    kenticoCloudItemProjectReference(fields: { slugStep1: { eq: $slugStep2 }}) {
      system {
        name
      }
      name___teaser_image__name {
        value
      }
      name___teaser_image__teaser_image {
        assets {
          url
        }
      }
      url {
        value
      }
      started_at {
        datetime
      }
      finished_at {
        datetime
      }
    }
  }
`;

ProjectReference.propTypes = {
  data: PropTypes.object,
};
