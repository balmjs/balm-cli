#!/usr/bin/env node

const pkg = require('../package');
const balmPkg = require('../lib/balm-core');
const program = require('commander');

const version = `balm-cli: ${pkg.version}\nbalm-core: ${balmPkg.version} (${
  balmPkg.isLocal ? 'Local' : 'Global'
})`;

program
  .version(version)
  .usage('<command> [options]')
  .command('go', 'run a project')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates');

program.parse(process.argv);
