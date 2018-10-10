# Gatsby starter site with Kentico Cloud

This repo contains a [Gatsby v2 starter site](https://www.gatsbyjs.org/starters/) preconfigured with [Kentico Cloud](https://www.kenticocloud.com/) [source plugin](https://www.npmjs.com/package/gatsby-source-kentico-cloud). The site portrays a personal site of a fictional technical evangelist that attends user groups, writes blog posts and implements projects.

![Gatsby starter site with Kentico Cloud](https://i.imgur.com/xvASA35.png)

## Prerequisites

* [Node.js](https://nodejs.org/) with NPM installed

## How to run the code

The preferred way is to use Gatsby CLI `gatsby new` command, but you can of course simply clone or fork this repo.

### Use Gatsby CLI

Make sure you have Gatsby CLI installed via `npm list -g gatsby-cli`. If not, you can install CLI via `npm install --global gatsby-cli`.

Then, navigate to your projects folder and run `gatsby new [subfolder name] https://github.com/Kentico/gatsby-starter-kentico-cloud`. Replace `[subfolder name]` with your project folder's name. The CLI tool will essentially do three things:

* create a subfolder
* clone the starter site codefiles into that subfolder
* run `npm install` to get all dependencies for you

### Clone or fork the repo

[Clone](https://git-scm.com/docs/git-clone) or [fork](https://hub.github.com/hub-fork.1.html) this repo. Once it's done, navigate to the [app's root directory](https://github.com/Kentico/gatsby-starter-kentico-cloud) and run:

`npm install`

### Run the starter site

Now, run:

`npm run develop` (or `gatsby develop`, should you have the Gatsby CLI installed)

This will bootstrap the site, build all static pages and start the site at http://localhost:8000 . You'll also be able to test arbitrary GraphQL queries in the GraphiQL interface via http://localhost:8000/___graphql.

**Note:** You may encounter a [known issue](#troubleshooting) in Gatsby. Please rebuild your project once again to get around it.

## Developing

* [Visual Studio Code](https://code.visualstudio.com/)

### Experimenting

Of all the artifacts of Kentico Cloud, the starter site only displays content items and only in the default language. But, our [source plugin](https://github.com/Kentico/gatsby-source-kentico-cloud) also provides content types and items in non-default languages. The plugin links them all so that these data can be fetched in one GraphQL query.

Check out the [source plugin](https://github.com/Kentico/gatsby-source-kentico-cloud#features) for more details on which kinds of data and relationships it supports.

### Troubleshooting

In case you encounter the following error:

`GraphQL Error Unknown field 'system' on type '...'`

just rebuild the site using `npm run develop` or `gatsby develop` (should you have Gatsby CLI installed).

This [error](https://github.com/gatsbyjs/gatsby/issues/8053) is caused by Gatsby having difficulties with class instances that our [JS SDK](https://github.com/Enngage/kentico-cloud-js) produces. It can be worked around by running `npm run develop` or `gatsby develop` once more.

We'll work with Gatsby to see if the support can be brought to Gatsby or if it needs to be worked around in the source plugin.

![Analytics](https://kentico-ga-beacon.azurewebsites.net/api/UA-69014260-4/Kentico/gatsby-source-kentico-cloud?pixel)
