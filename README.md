# Kentico Cloud Gatsby source plugin, sample app 

This repo contains a [Gatsby](https://www.gatsbyjs.org/) source plugin for [Kentico Cloud](https://www.kenticocloud.com/). The [plugin](https://github.com/Kentico/cloud-gatsby/tree/master/plugins/gatsby-source-kentico-cloud) is accompanied by a simple [example app](https://github.com/Kentico/cloud-gatsby/tree/master/src), called Personal Portfolio. It portrays a personal site of a fictional technical evangelist that attends user groups, writes blog posts and implements projects.

## System requirements

* [Node.js](https://nodejs.org/) with NPM installed
* [Visual Studio Code](https://code.visualstudio.com/) (optional, for debugging purposes)
    * [Jest plugin for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) (optional, for automated tests)

## How to run the code

Clone or fork this repo. Once it's done, navigate to the sample [app's root directory](https://github.com/Kentico/cloud-gatsby/tree/master/src) and run:

`npm install`

Then, you need to run the above command in the [./plugins/gatsby-source-kentico-cloud](https://github.com/Kentico/cloud-gatsby/tree/master/plugins/gatsby-source-kentico-cloud) directory:

`npm install`

After that, go back to the app's root directory and run:

`gatsby develop`

This will bootstrap the site, build all static pages and start the site at http://localhost:8000 . You'll also be able to test arbitrary GraphQL queries in the GraphiQL interface via http://localhost:8000/___graphql .

If you happen to use Visual Studio Code, you'll be able to place breakpoints in the [gatsby-node.js] files in both the [app's directory](https://github.com/Kentico/cloud-gatsby/blob/master/gatsby-node.js) and the [source plugin directory](https://github.com/Kentico/cloud-gatsby/blob/master/plugins/gatsby-source-kentico-cloud/gatsby-node.js). With the Jest plugin for Visual Studio Code, you'll also always see results of automated tests.

The [launch.json](https://github.com/Kentico/cloud-gatsby/blob/master/.vscode/launch.json) is also preconfigured for breakpoint interception in Jest tests. All you have to do to debug Jest tests is to switch from the "Gatsby develop" configuration to either "Jest all" or the "Jest current file" configuration in the Visual Studio Code "Debug" pane.
