import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { formatDate } from '../helpers/date-time';

const SpeakingEngagement = ({data}) => {
  const item = data.kontentItemSpeakingEngagement;

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
              <td>{item.elements.date.value ? formatDate(item.elements.date.value) : `Unknown date`}</td>
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
  query speakingEngagementQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    kontentItemSpeakingEngagement(fields: { slug: { eq: $slug }}) {
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
