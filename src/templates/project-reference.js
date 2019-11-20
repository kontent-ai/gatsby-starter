import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { formatDate } from '../helpers/date-time';

const ProjectReference = ({data}) => {
  const item = data.kontentItemProjectReference;

  return (
    <Layout>
      <div>
        <img src={item.elements.teaser_image.value[0].url} />
          <table>
            <tbody>
            <tr>
              <th>Name:</th>
              <td>{item.elements.teaser_image.value.name}</td>
            </tr>
            <tr>
              <th>URL:</th>
              <td>{item.elements.url.value}</td>
            </tr>
            <tr>
              <th>Duration:</th>
              <td>{item.elements.started_at.value ? formatDate(item.elements.started_at.value) : `Unknown starting date`} &ndash; {item.elements.finished_at.value ? formatDate(item.elements.finished_at.value) : `until now`}</td>
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
  kontentItemProjectReference(fields: { slug: { eq: $slug }}) {
    system {
      name
    }
    elements {
       teaser_image{
        value {
          url
        }
      }
      teaser_image {
        value {
          name
        }
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
