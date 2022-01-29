#!/usr/bin/env node
import path from 'node:path';
import { existsSync } from 'node:fs';
import os from 'node:os';
import { Command } from 'commander';
import ora from 'ora';
import chalk from 'chalk';
import inquirer from 'inquirer';
import rimraf from 'rimraf';
import tildify from '../lib/tildify.js';
import download from '../lib/git/download.js';
import logger from '../lib/logger.js';
import generate from '../lib/generate.js';
import checkVersion from '../lib/check-version.js';
import localPath from '../lib/local-path.js';

const home = os.homedir();
const program = new Command();
const rm = rimraf.sync;
const { isLocalPath, getTemplatePath } = localPath;

/**
 * Usage.
 */

program
  .usage('<template-name> [project-name]')
  .option('-c, --clone', 'use git clone')
  .option('--offline', 'use cached template');

/**
 * Help.
 */

program.on('--help', () => {
  console.log('  Examples:');
  console.log();
  console.log(
    chalk.gray('    # create a new project with an official template')
  );
  console.log('    $ balm init vue my-project');
  console.log();
  console.log(
    chalk.gray('    # create a new project straight from a github template')
  );
  console.log('    $ balm init username/repo my-project');
  console.log();
});

/**
 * Help.
 */

function help() {
  program.parse(process.argv);
  if (program.args.length < 1) return program.help();
}
help();

/**
 * Settings.
 */

let template = program.args[0];
const hasSlash = template.indexOf('/') > -1;
const rawName = program.args[1];
const inPlace = !rawName || rawName === '.';
const name = inPlace ? path.relative('../', process.cwd()) : rawName;
const to = path.resolve(rawName || '.');
const clone = program.clone || false;

// eslint-disable-next-line no-useless-escape
const tmp = path.join(home, '.balm-templates', template.replace(/[\/:]/g, '-'));
if (program.offline) {
  console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`);
  template = tmp;
}

/**
 * Padding.
 */

console.log();
process.on('exit', () => {
  console.log();
});

if (inPlace || existsSync(to)) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: inPlace
          ? 'Generate project in current directory?'
          : 'Target directory exists. Continue?',
        name: 'ok'
      }
    ])
    .then((answers) => {
      if (answers.ok) {
        run();
      }
    })
    .catch(logger.fatal);
} else {
  run();
}

/**
 * Check, download and generate the project.
 */

function run() {
  // check if template is local
  if (isLocalPath(template)) {
    const templatePath = getTemplatePath(template);
    if (existsSync(templatePath)) {
      generate(name, templatePath, to, (err) => {
        if (err) logger.fatal(err);
        console.log();
        logger.success('Generated "%s".', name);
      });
    } else {
      logger.fatal('Local template "%s" not found.', template);
    }
  } else {
    checkVersion(() => {
      if (!hasSlash) {
        // use official templates
        const officialTemplate = `balmjs/template-${template}`;
        downloadAndGenerate(officialTemplate);
      } else {
        downloadAndGenerate(template);
      }
    });
  }
}

/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate(template) {
  const spinner = ora('downloading template');
  spinner.start();
  // Remove if local template exists
  if (existsSync(tmp)) rm(tmp);
  download(
    template,
    tmp,
    {
      clone
    },
    (err) => {
      spinner.stop();
      if (err)
        logger.fatal(
          'Failed to download repo ' + template + ': ' + err.message.trim()
        );
      generate(name, tmp, to, (err) => {
        if (err) logger.fatal(err);
        console.log();
        logger.success('Generated "%s".', name);
      });
    }
  );
}
