# Kentico Cloud Gatsby source plugin, sample app 

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/cloud-gatsby?pixel)

This repo contains a [Gatsby](https://www.gatsbyjs.org/) source plugin for [Kentico Cloud](https://www.kenticocloud.com/). The [plugin](https://github.com/Kentico/cloud-gatsby/tree/master/plugins/gatsby-source-kentico-cloud) is accompanied by a simple [example app](https://github.com/Kentico/cloud-gatsby/tree/master/src), called Personal Portfolio. It portrays a personal site of a fictional technical evangelist that attends user groups, writes blog posts and implements projects.

![Kentico Cloud Gatsby sample app](https://i.imgur.com/bQyedOv.png)

## Prerequisites

* [Node.js](https://nodejs.org/) with NPM installed

## How to run the code

Clone or fork this repo. Once it's done, navigate to the sample [app's root directory](https://github.com/Kentico/cloud-gatsby/tree/master/src) and run:

`npm-install.cmd` (Windows)

or

`sudo ./npm-install.sh` (Unix)

By running this batch file, you'll basically invoke `npm install` in both the root directory and the [./plugins/gatsby-source-kentico-cloud](https://github.com/Kentico/cloud-gatsby/tree/master/plugins/gatsby-source-kentico-cloud) directory.

After that, run:

`npm run develop`

This will bootstrap the site, build all static pages and start the site at http://localhost:8000 . You'll also be able to test arbitrary GraphQL queries in the GraphiQL interface via http://localhost:8000/___graphql .

If you happen to use Visual Studio Code, you'll be able to place breakpoints in the [gatsby-node.js] files in both the [app's directory](https://github.com/Kentico/cloud-gatsby/blob/master/gatsby-node.js) and the [source plugin directory](https://github.com/Kentico/cloud-gatsby/blob/master/plugins/gatsby-source-kentico-cloud/gatsby-node.js). With the Jest plugin for Visual Studio Code, you'll also always see fresh results of automated tests.

The [launch.json](https://github.com/Kentico/cloud-gatsby/blob/master/.vscode/launch.json) is preconfigured for breakpoint interception in Jest tests. All you have to do to debug Jest tests is to switch from the "Gatsby develop" configuration to either "Jest all" or the "Jest current file" configuration in the Visual Studio Code "Debug" pane.

## Developing

* [Visual Studio Code](https://code.visualstudio.com/)
    * [Jest plugin for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) (optional, for automated tests)

### Experimenting

The sample app only displays Kentico Cloud content items and only in the default language. But, the source plugin also provides content types and items in non-default languages. The plugin links them all so that these data can be fetched in one GraphQL query.

#### Content item <-> content type relationships

The relationship is captured in the `contentItems` navigation property of all content type nodes. In all content item nodes, it can be found in the `contentType` navigation property.

You can use the GraphiQL interface to experiment with the data structures produced by the source plugin. For instance, you can fetch content items of type `kenticoCloudItemProjectReference` and use the `contentType` navigation property to get the full list of elements of the underlying content type. Like so:

    {
      allKenticoCloudItemProjectReference {
        edges {
          node {
            name___teaser_image__name {
              value
            }
            contentType {
              elements {
                codename
              }
            }
          }
        }
      }
    }

#### Language variants relationships

This relationship is captured by `otherLanguages` navigation property of all content item nodes. For instance, you can get names of content items of type `kenticoCloudItemSpeakingEngagement` in their default language as well as in other languages. All in one go:

    {
      allKenticoCloudItemSpeakingEngagement {
        edges {
          node {
            name {
              value
            }
            otherLanguages {
              name {
                value
              }
            }
          }
        }
      }
    }
    
#### Modular content elements relationships

Each modular content property is accompanied by a sibling property suffixed with `_nodes` that can be used to traverse to linked nodes of modular content items.

    {
      allKenticoCloudItemProjectReference {
        edges {
          node {
            related_project_references {
              name___teaser_image__name {
                value
              }
            }
            related_project_references_nodes {
              name___teaser_image__name {
                value
              }
              related_project_references_nodes {
                ...
              }
            }
          }
        }
      }
    }

#### Modular content relationships in rich text

As with the previous example, all rich text properties with modular content also have an accompanying `_nodes` property.

    {
      allKenticoCloudItemBlogpostReference {
        edges {
          node {
            name___teaser_image__name {
              value
            }
            summary_nodes {
              system {
                codename
              }
            }
          }
        }
      }
    }

**Note:** For an unknown reason, Gatsby `createNode` API currently fails to create rich text relationships for more than one node in the store. 

#### Reverse links

All nodes have a `usedByContentItems` property that reflects in which this node is used as modular content.

### Troubleshooting

In case you encounter the following error:

`GraphQL Error Unknown field 'system' on type '...'`

just rebuild the site using `npm run develop` or `gatsby develop` (should you have Gatsby CLI installed).

This error occurs rather randomly; mostly due to issues with building of the internal schema. If it cannot be solved by rebuilding with `npm run develop` or raising the `version` field in the [package.json](https://github.com/Kentico/cloud-gatsby/blob/master/plugins/gatsby-source-kentico-cloud/package.json) of the source plugin, then you should look for other root causes (not related to [building of the schema](https://github.com/gatsbyjs/gatsby/issues/2674#issuecomment-340510736)).
