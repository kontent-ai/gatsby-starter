import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from '../components/header';
import './layout.css';

const Layout = ({ children }) => (
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
            { name: `description`, content: `Gatsby starter site with Kontent.ai` },
            { name: `keywords`, content: `Kontent.ai, Gatsby, starter` },
          ]}
        >
          <script>
            {`
              window.twttr = (function (d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
              if (d.getElementById(id)) return t;
              js = d.createElement(s);
              js.id = id;
              js.src = 'https://platform.twitter.com/widgets.js';
              fjs.parentNode.insertBefore(js, fjs);

              t._e = [];
              t.ready = function (f) {
                t._e.push(f);
              };

              return t;
              })(document, 'script', 'twitter-wjs');`
            }
          </script>
        </Helmet>
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
