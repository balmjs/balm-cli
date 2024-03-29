import { createRequire } from 'node:module';
import path from 'node:path';
import { existsSync } from 'node:fs';
import validateName from 'validate-npm-package-name';
import { readMetadataSync } from './read-metadata.js';
import getGitUser from './git/user.js';

const requireModule = createRequire(import.meta.url);

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata(dir) {
  const json = path.join(dir, 'meta.json');
  const js = path.join(dir, 'meta.js');
  let opts = {};

  if (existsSync(json)) {
    opts = readMetadataSync(json);
  } else if (existsSync(js)) {
    const req = requireModule(path.resolve(js));
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object');
    }
    opts = req;
  }

  return opts;
}

/**
 * Set the default value for a prompt question
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */

function setDefault(opts, key, val) {
  if (opts.schema) {
    opts.prompts = opts.schema;
    delete opts.schema;
  }
  const prompts = opts.prompts || (opts.prompts = {});
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val
    };
  } else {
    prompts[key]['default'] = val;
  }
}

function setValidateName(opts) {
  const name = opts.prompts.name;
  const customValidate = name.validate;
  name.validate = (name) => {
    const its = validateName(name);
    if (!its.validForNewPackages) {
      const errors = (its.errors || []).concat(its.warnings || []);
      return `Sorry, ${errors.join(' and ')}.`;
    }
    if (typeof customValidate === 'function') return customValidate(name);
    return true;
  };
}

/**
 * Read prompts metadata.
 *
 * @param {String} dir
 * @return {Object}
 */

export default function options(name, dir) {
  const opts = getMetadata(dir);

  setDefault(opts, 'name', name);
  setValidateName(opts);

  const author = getGitUser();
  if (author) {
    setDefault(opts, 'author', author);
  }

  return opts;
}
