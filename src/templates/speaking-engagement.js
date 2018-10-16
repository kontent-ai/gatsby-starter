import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const SpeakingEngagement = ({data}) => {
  const item = data.kenticoCloudItemSpeakingEngagement;
  return (
    <Layout>
      <div>
      <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{item.elements.name.value}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{item.elements.date.value ? item.elements.date.value : `Unknown date`}</td>
            </tr>
            <tr>
              <th>Format:</th>
              <td>{item.elements.format.value.map((option) => option.name)}</td>
            </tr>
            <tr>
              <th>URL/location:</th>
              <td>{item.elements.url_location.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default SpeakingEngagement;

export const query = graphql`
  query speakingEngagementQuery($slugStep2: String!) {
    site {
      siteMetadata {
        title
      }
    }
    kenticoCloudItemSpeakingEngagement(fields: { slugStep1: { eq: $slugStep2 }}) {
      system {
        name
      }
      elements {
        name {
          value
        }
        date {
          value
        }
        format {
          value {
            name
          }
        }
        url_location {
          value
        }
      }
    }
  }
`;

SpeakingEngagement.propTypes = {
  data: PropTypes.object,
};
