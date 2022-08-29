import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import { formatDate } from '../helpers/date-time';

const Article = ({data}) => {
  const item = data.kontentItemArticle;

  return (
    <Layout>
      <div>
        <img src={item.elements.teaser_image.value[0].url} />
          <table>
            <tbody>
            <tr>
              <th>Name:</th>
              <td>{item.elements.title.value}</td>
            </tr>
            <tr>
              <th>Summary:</th>
              <td>{item.elements.summary.value}</td>
            </tr>
            <tr>
              <th>Post Date:</th>
              <td>{item.elements.post_date.value ? formatDate(item.elements.post_date.value) : `Unknown post date`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Article;

export const query = graphql`
  query articleQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    kontentItemArticle(elements: { url_pattern: { value: { eq: $slug } }}) {
      system {
        name
      }
      elements {
        title {
          value
        }
        teaser_image {
          name
          value {
            url
          }
        }
        summary {
          value
        }
        post_date {
          value
        }
      }
    }
  }
`;

Article.propTypes = {
  data: PropTypes.object,
};
