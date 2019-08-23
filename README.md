# Gatsby starter site with Kentico Cloud

[![Netlify Status](https://api.netlify.com/api/v1/badges/78b48df8-68df-4b9a-9dfc-91803d8a77d8/deploy-status)](https://app.netlify.com/sites/gatsby-starter-kentico-cloud/deploys)

[![Live demo](https://img.shields.io/badge/-Live%20Demo-brightgreen.svg)](https://gatsby-starter-kentico-cloud.netlify.com/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-cloud)

This repo contains a [Gatsby v2 starter site](https://www.gatsbyjs.org/starters/Kentico/gatsby-starter-kentico-cloud/) preconfigured with [Kentico Cloud](https://www.kenticocloud.com/) [source plugin](https://www.npmjs.com/package/gatsby-source-kentico-cloud). The site portrays a personal site of a fictional technical evangelist that attends user groups, writes blog posts and implements projects.

![Gatsby starter site with Kentico Cloud](https://i.imgur.com/xvASA35.png)

## Prerequisites

- [Node.js](https://nodejs.org/) with NPM installed
- [Yarn](https://yarnpkg.com/)

## How to run the code

The preferred way is to use Gatsby CLI `gatsby new` command, but you can of course simply clone or fork this repo.

### Use Gatsby CLI

Make sure you have Gatsby CLI installed via `yarn global list`. If not, you can install CLI via `yarn add global gatsby-cli`.

Then, navigate to your projects directory and run `gatsby new [subdirectory name] https://github.com/Kentico/gatsby-starter-kentico-cloud`. Replace `[subdirctory name]` with your project directory's name. The CLI tool will essentially do three things:

- create a subdirectory
- clone the starter site codefiles into that subdirectory
- run `yarn install` to get all dependencies for you

### Clone or fork the repo

[Clone](https://git-scm.com/docs/git-clone) or [fork](https://hub.github.com/hub-fork.1.html) this repo. Once it's done, navigate to the [app's root directory](https://github.com/Kentico/gatsby-starter-kentico-cloud) and run:

`yarn install`

### Run the starter site

Now, run:

`yarn run develop` (or `gatsby develop`, should you have the Gatsby CLI installed)

This will bootstrap the site, build all static pages and start the site at http://localhost:8000 . You'll also be able to test arbitrary GraphQL queries in the GraphiQL interface via http://localhost:8000/___graphql.

## Developing

You may use any IDE, however, we've added a [settings file](https://github.com/Kentico/gatsby-starter-kentico-cloud/blob/master/.vscode/launch.json) for [Visual Studio Code](https://code.visualstudio.com/) for easier debugging.

To get a smooth debugging experience, you can temporarily copy the `gatsby-source-kentico-cloud` [directory](https://github.com/Kentico/gatsby-source-kentico-cloud) of the source plugin to the `/plugins` directory of your site. Then, move the `gatsby-node.js` and `normalize.js` files from `/plugins/gatsby-source-kentico-cloud/src` to `/plugins/gatsby-source-kentico-cloud` (up one level).

### Using the Kentico Cloud JavaScript SDK configuration object

The source plugin used by this starter in turn uses the [Kentico Cloud Delivery SDK](https://github.com/Kentico/kentico-cloud-js/tree/master/packages/delivery#kentico-cloud-delivery-sdk) in the background. You can put the [configuration object](https://github.com/Kentico/kentico-cloud-js/blob/master/packages/delivery/DOCS.md#client-configuration) of the SDK into the `deliveryClientConfig` property of the [gatsby-config.js](https://github.com/Kentico/gatsby-starter-kentico-cloud/blob/master/gatsby-config.js) file.

### Experimenting

Of all the artifacts of Kentico Cloud, the starter site only displays content items and only in the default language. But, our [source plugin](https://github.com/Kentico/gatsby-source-kentico-cloud) also provides content types and items in non-default languages. The plugin links them all so that these data can be fetched in one GraphQL query.

Check out the [source plugin](https://github.com/Kentico/gatsby-source-kentico-cloud#features) for more details on which kinds of data and relationships it supports.

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/gatsby-starter-kentico-cloud?pixel)
