import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

const Index = ({data}) => {


  return (
    <Layout>
      <div>
        {data}
      </div>
    </Layout>
  );
};

export default Index;

export const query = graphql`
  {
    allSitePage {
      edges {
        node {
          internalComponentName
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.object,
};