# Gatsby starter site with Kentico Kontent

[![Netlify Status](https://api.netlify.com/api/v1/badges/78b48df8-68df-4b9a-9dfc-91803d8a77d8/deploy-status)](https://app.netlify.com/sites/gatsby-starter-kontent/deploys)

[![Live demo](https://img.shields.io/badge/-Live%20Demo-brightgreen.svg)](https://gatsby-starter-kontent.netlify.com/)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-ASK%20NOW-FE7A16.svg?logo=stackoverflow&logoColor=white)](https://stackoverflow.com/tags/kentico-kontent)

This repo contains a [Gatsby v2 starter site](https://www.gatsbyjs.org/starters/Kentico/gatsby-starter-kontent/) pre-configured with [Kentico Kontent](https://kontent.ai/) [source plugin](https://www.npmjs.com/package/@kentico/gatsby-source-kontent). The site portrays a personal site of a fictional technical evangelist that attends user groups, writes blog posts and implements projects.

![Gatsby starter site with Kentico Kontent](screenshot.png)

## Prerequisites

* [Node.js](https://nodejs.org/) with NPM installed

## How to run the code

The preferred way is to use Gatsby CLI `gatsby new` command, but you can of course simply clone or fork this repo.

### Use Gatsby CLI

Make sure you have Gatsby CLI installed via `npm list -g gatsby-cli`. If not, you can install CLI via `npm install --global gatsby-cli`.

Then, navigate to your projects directory and run `gatsby new [subdirectory name] https://github.com/Kentico/gatsby-starter-kentico-cloud`. Replace `[subdirectory name]` with your project directory's name. The CLI tool will essentially do three things:

* create a subdirectory
* clone the starter site codefiles into that subdirectory
* run `npm install` to get all dependencies for you and copy content from `.env.template` to newly created `.env` file.

### Clone or fork the repo

[Clone](https://git-scm.com/docs/git-clone) or [fork](https://hub.github.com/hub-fork.1.html) this repo. Once it's done, navigate to the [app's root directory](https://github.com/Kentico/gatsby-starter-kentico-cloud) and run:

`npm install`

### Run the starter site

Now, run:

`npm develop` (or `gatsby develop`, should you have the Gatsby CLI installed)

This will bootstrap the site, build all static pages and start the site at <http://localhost:8000> . You'll also be able to test arbitrary GraphQL queries in the GraphiQL interface via <http://localhost:8000/___graphql>.

## Developing

You may use any IDE, however, we've added a [settings file](https://github.com/Kentico/gatsby-starter-kentico-cloud/blob/master/.vscode/launch.json) for [Visual Studio Code](https://code.visualstudio.com/) for easier debugging.

### Experimenting

Of all the artifacts of Kentico Kontent, the starter site only displays content items and only in the default language. But, our [source plugin](https://github.com/Kentico/gatsby-source-kontent/tree/master/packages/gatsby-source-kontent) also provides content types and items in non-default languages.

Check out the [source plugin's readme](https://github.com/Kentico/gatsby-source-kontent/tree/master/packages/gatsby-source-kontent#readme) for more details on which kinds of data and relationships it supports.

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/gatsby-starter-kontent?pixel)
