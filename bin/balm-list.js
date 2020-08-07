#!/usr/bin/env node

const logger = require('../lib/logger');
const { chalk, request } = require('../lib/utils');
const localRepos = require('../lib/repos.json');

const COLOR_MAP = {
  react: 'cyanBright',
  vue: 'greenBright',
  ng: 'redBright'
};
const POP = Object.keys(COLOR_MAP);

const tagCategory = (repoName) => {
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
};

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

const url = 'https://api.github.com/users/balmjs/repos';
const headers = {
  'User-Agent': 'balm-cli',
  Accept: 'application/vnd.github.nebula-preview+json'
};

request
  .get(url, { headers })
  .then(({ body }) => {
    const requestBody = body;
    if (Array.isArray(requestBody)) {
      console.log('  Available official templates:');
      console.log();
      requestBody
        .filter(
          (repo) => /^template-[a-z]{2,}/i.test(repo.name) && repo.description
        )
        .forEach((repo) => {
          console.log(
            '  ' +
              chalk.yellow('★') +
              '  ' +
              tagCategory(repo.name) +
              ' - ' +
              repo.description
          );
        });
    } else {
      console.error(requestBody.message);
    }
  })
  .catch((err) => {
    // logger.fatal(err);

    localRepos.forEach((repo) => {
      console.log(
        '  ' +
          chalk.yellow('★') +
          '  ' +
          tagCategory(repo.name) +
          ' - ' +
          repo.description
      );
    });
  });
