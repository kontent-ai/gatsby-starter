# Gatsby starter site with Kontent by Kentico

[![Netlify Status](https://api.netlify.com/api/v1/badges/78b48df8-68df-4b9a-9dfc-91803d8a77d8/deploy-status)](https://app.netlify.com/sites/gatsby-starter-kontent/deploys)

[![Live demo](https://img.shields.io/badge/-Live%20Demo-brightgreen.svg)](https://gatsby-starter-kontent.netlify.com/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

This repo contains a [Gatsby v2 starter site](https://www.gatsbyjs.org/starters/Kentico/gatsby-starter-kontent/) pre-configured with [Kontent](https://kontent.ai/) [source plugin](https://www.npmjs.com/package/@kentico/gatsby-source-kontent). The site portrays a personal site of a fictional technical evangelist that attends user groups, writes blog posts and implements projects.

![Gatsby starter site with Kontent by Kentico](screenshot.png)

## Prerequisites

* [Node.js](https://nodejs.org/) with NPM installed

## How to run the code

The preferred way is to use Gatsby CLI `gatsby new` command, but you can of course simply clone or fork this repo.

### Use Gatsby CLI

Make sure you have Gatsby CLI installed via `npm list -g gatsby-cli`. If not, you can install CLI via `npm install --global gatsby-cli`.

Then, navigate to your projects directory and run `gatsby new [subdirectory name] https://github.com/Kentico/gatsby-starter-kentico-cloud`. Replace `[subdirectory name]` with your project directory's name. The CLI tool will essentially do three things:

* create a subdirectory
* clone the starter site code files into that subdirectory
* run `npm install` to get all dependencies for you
  * that also copies content from `.env.template` to newly created `.env` file using `prepare` npm script

### Clone or fork the repo

[Clone](https://git-scm.com/docs/git-clone) or [fork](https://hub.github.com/hub-fork.1.html) this repo. Once it's done, navigate to the [app's root directory](https://github.com/Kentico/gatsby-starter-kontent) and run:

`npm install`

### Run the starter site

Now, run:

`npm develop` (or `gatsby develop`, should you have the Gatsby CLI installed)

This will bootstrap the site, build all static pages and start the site at <http://localhost:8000> . You'll also be able to test arbitrary GraphQL queries in the GraphiQL interface via <http://localhost:8000/___graphql>.

## Developing

You may use any IDE, however, we've added a [settings file](https://github.com/Kentico/gatsby-starter-kentico-cloud/blob/master/.vscode/launch.json) for [Visual Studio Code](https://code.visualstudio.com/) for easier debugging.

### Create content source

1. Go to [app.kontent.ai](https://app.kontent.ai) and [create empty project](https://docs.kontent.ai/tutorials/set-up-kontent/projects/manage-projects#a-creating-projects)
1. Go to "Project Settings", select API keys and copy
    * Project ID
    * Management API key
1. Install [Kontent Backup Manager](https://github.com/Kentico/kontent-backup-manager-js) and import data to newly created project from [`content.zip`](./content.zip) file (place appropriate values for `apiKey` and `projectId` arguments):

    ```sh
    npm i -g @kentico/kontent-backup-manager

    kbm --action=restore --apiKey=<Management API key> --projectId=<Project ID> --zipFilename=content
    ```

    * :bulb: Alternatively, you can use the [Template Manager UI](https://kentico.github.io/kontent-template-manager/import-from-file) for importing the content.

1. Go to your Kontent project and [publish all the imported items](https://docs.kontent.ai/tutorials/write-and-collaborate/publish-your-work/publish-content-items).

1. Set environment variables to `.env` (created automatically by running `npm install`)
    * `KONTENT_PROJECT_ID` from Go to "Project Settings" -> "API keys" -> "Delivery API" -> "Project ID"
    * `KONTENT_LANGUAGE_CODENAMES`  from "Project Settings" -> "Localization" (use "Codename" of each language)

### Retrieve both published and unpublished content

To load data from [Preview API](https://docs.kontent.ai/reference/delivery-api#section/Production-vs.-Preview) just set following environment variables to you `.env` file (created automatically by running `npm install`)

* `KONTENT_PREVIEW_KEY` from Go to "Project Settings" -> "API keys" -> "Preview API" -> "Primary key/Secondary key"
* `KONTENT_PREVIEW_ENABLED` to `true`

### Experimenting

Of all the artifacts of Kontent, the starter site only displays content items and only in the default language. But, our [source plugin](https://github.com/Kentico/gatsby-source-kontent/tree/master/packages/gatsby-source-kontent) also provides content types and items in non-default languages.

Check out the [source plugin's readme](https://github.com/Kentico/gatsby-source-kontent/tree/master/packages/gatsby-source-kontent#readme) for more details on which kinds of data and relationships it supports.

