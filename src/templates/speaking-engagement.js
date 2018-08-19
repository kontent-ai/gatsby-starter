import React from 'react';

export default ({ data }) => {
  console.log(data)
  const item = data.kenticoCloudItemSpeakingEngagement;
  return (
    <div>
      <table>
        <tr>
          <th>Name:</th>
          <td>{data.kenticoCloudItemSpeakingEngagement.name.value}</td>
        </tr>
        <tr>
          <th>Date:</th>
          <td>{data.kenticoCloudItemSpeakingEngagement.date.datetime}</td>
        </tr>
        <tr>
          <th>Format:</th>
          <td>{data.kenticoCloudItemSpeakingEngagement.format.value.map(option => option.name)}</td>
        </tr>
        <tr>
          <th>URL/location:</th>
          <td>{data.kenticoCloudItemSpeakingEngagement.url_location.value}</td>
        </tr>
      </table>
    </div>
  );

}

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
`