#!/usr/bin/env node
import { createRequire } from 'node:module';
import { chalk, request } from '../lib/utils/index.js';

const requireModule = createRequire(import.meta.url);
const localRepos = requireModule('../lib/repos.json');

const COLOR_MAP = {
  react: 'cyanBright',
  vue: 'greenBright',
  vite: 'greenBright',
  ng: 'redBright'
};
const POP = Object.keys(COLOR_MAP);

function tagCategory(repoName) {
  let templateName = repoName.replace('template-', '');
  let result = chalk.blue(templateName);

  for (let i = 0, len = POP.length; i < len; i++) {
    let key = POP[i];
    if (new RegExp(`${key}.*`, 'i').test(templateName)) {
      result = chalk[COLOR_MAP[key]](templateName);
      break;
    }
  }

  return result;
}

/**
 * Padding.
 */

console.log();
process.on('exit', () => {
  console.log();
});

/**
 * List repos.
 */

const url =
  'https://api.github.com/orgs/balmjs/repos?sort=full_name&per_page=50';
const headers = {
  'User-Agent': 'balm-cli',
  Accept: 'application/vnd.github.v3+json'
};

const isValidTemplate = ({ name, description }) =>
  /^template-[a-z]{2,}/i.test(name) &&
  description &&
  !/Coming soon/i.test(description);

function showRepositories(repos) {
  repos.forEach(({ name, description }) =>
    console.log(
      '  ' + chalk.yellow('★') + '  ' + tagCategory(name) + ' - ' + description
    )
  );
}

request
  .get(url, { headers })
  .then((responseData) => {
    if (Array.isArray(responseData)) {
      const remoteRepos = responseData.filter((repo) => isValidTemplate(repo));

      console.log('  Available official templates:');
      console.log();
      showRepositories(remoteRepos);
    }
  })
  .catch((e) => showRepositories(localRepos));
