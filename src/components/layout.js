import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from '../components/header';
import './layout.css';

const Layout = ({children}) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {name: `description`, content: `Gatsby starter site with Kontent.ai`},
            {name: `keywords`, content: `Kontent.ai, Gatsby, starter`},
          ]}
        />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </div>
    )}></StaticQuery>
);

Layout.propTypes = {
  children: PropTypes.object,
};

export default Layout;
