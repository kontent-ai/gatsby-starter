import React from 'react';

export default ({ data }) => {
  console.log(data)
  const item = data.kenticoCloudItemProjectReference;
  return (
    <div>
      <img src={item.name___teaser_image__teaser_image.assets[0].url} />
      <table>
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
      </table>
    </div>
  );

}

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
`