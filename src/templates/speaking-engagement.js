import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const SpeakingEngagement = ({data}) => {
  const item = data.kenticoCloudItemSpeakingEngagement;
  const formatDate = function(time) {
     return new Date(time).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric',
                                                     hour: 'numeric', minute: 'numeric', hour12: true });
  }
  return (
    <Layout>
      <div>
      <table>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{item.name.value}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{formatDate(item.date.datetime)}</td>
            </tr>
            <tr>
              <th>Format:</th>
              <td>{item.format.value.map((option) => option.name)}</td>
            </tr>
            <tr>
              <th>URL/location:</th>
              <td>{item.url_location.value}</td>
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
      name {
        value
      }
      date {
        datetime
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
`;

SpeakingEngagement.propTypes = {
  data: PropTypes.object,
};
