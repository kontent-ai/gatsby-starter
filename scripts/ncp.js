#!/usr/env node
/* eslint-disable no-console */
const ncp = require('ncp').ncp;

ncp.limit = 16;

const source = process.argv[2];
const destination = process.argv[3];

ncp(source, destination, { clobber: false }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`${source} copied to ${destination} if not already exists.`);
  process.exit(0);
});