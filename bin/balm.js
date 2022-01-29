#!/usr/bin/env node
import { createRequire } from 'node:module';
import { Command } from 'commander';
import balmPkg from '../lib/balm-core.js';

const requireModule = createRequire(import.meta.url);

const program = new Command();
const pkg = requireModule('../package.json');

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
