import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import { formatDate } from '../helpers/date-time';
import { RichTextElement } from '@kontent-ai/gatsby-components'

const Article = ({ data }) => {
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

        <RichTextElement
          value={item.elements.body_copy.value}
          images={item.elements.body_copy.images}
          links={item.elements.body_copy.links}
          linkedItems={item.elements.body_copy.modular_content}
          resolveImage={() => { }}
          resolveLink={(link, domOptions) => {
            if (link.type === 'article') {
              return (<Link to={`../../${item.fields.templateName}/${link.url_slug}`}>
                {domOptions.children[0].data}
              </Link>)
            }
          }}
          resolveLinkedItem={linkedItem => {
            // In case of linked item is not a part fo the response
            if (!linkedItem) {
              return <strong style={{ color: "red" }}>⚠ Linked item is no longer in the response. ⚠</strong>
            }

            if (linkedItem.system.type === 'tweet') {
              const tweet = linkedItem.elements;
              let tweetLink = tweet.tweet_link.value;
              let tweetID = tweetLink.match('^.*twitter.com/.*/(\\d+)/?.*$')[1];

              let selectedTheme = tweet.theme.value[0].codename;
              selectedTheme = selectedTheme ? selectedTheme : 'light';

              if(typeof window !== 'undefined') {
              setTimeout(() => {
                window.twttr.widgets.createTweet(
                  tweetID,
                  document.getElementById(`tweet${tweetID}`),
                  {
                    theme: selectedTheme,
                  }
                );
              }, 150);
            }

              return <div id={`tweet${tweetID}`}></div>;
            }
            if (linkedItem.system.type === 'hosted_video') {
              const video = linkedItem.elements;
              if (video.video_host.value.find(item => item.codename === 'vimeo')) {
                return (<iframe class="hosted-video__wrapper"
                  src={`https://player.vimeo.com/video/${video.video_id.value}?title=0&byline=0&portrait=0`}
                  width="640"
                  height="360"
                  frameborder="0"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen >
                </iframe>);
              }
              else if (video.video_host.value.find(item => item.codename === 'youtube')) {
                return (<iframe
                  className="hosted-video__wrapper"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.video_id.value}`}
                  frameBorder="0"
                  allowFullScreen
                  title={`Youtube video ${video.video_id.value}`}>
                </iframe>);
              }
            }

            return '<div></div>';
          }}
        />
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
      fields{
        templateName
      }
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
        body_copy{
          value
          modular_content {
            __typename
            system {
              codename
              type
            }
            ... on kontent_item_tweet {
              elements {
                theme {
                  value {
                    codename
                    name
                  }
                }
                display_options {
                  value {
                    codename
                    name
                  }
                }
                tweet_link {
                  value
                }
              }
            }
            ... on kontent_item_hosted_video {
              elements {
                video_id {
                  value
                }
                video_host {
                  value {
                    name
                    codename
                  }
                }
              }
            }
          }
          images {
            url
            description
            height
            image_id
            width
          }
          links {
            link_id
            codename
            type
            url_slug
          }
        }
      }
    }
  }
`;

Article.propTypes = {
  data: PropTypes.object,
};
