const gitClone = require('./clone');
const downloadUrl = require('download');
const rm = require('rimraf').sync;

/**
 * Expose `download`.
 */

module.exports = download;

/**
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Object} opts
 * @param {Function} fn
 */

function download(repo, dest, opts, fn) {
  if (typeof opts === 'function') {
    fn = opts;
    opts = null;
  }
  opts = opts || {};
  let clone = opts.clone || false;
  delete opts.clone;

  repo = normalize(repo);
  let url = repo.url || getUrl(repo, clone);

  if (clone) {
    let cloneOptions = {
      checkout: repo.checkout,
      shallow: repo.checkout === 'master',
      ...opts
    };
    gitClone(url, dest, cloneOptions, function (err) {
      if (err === undefined) {
        rm(dest + '/.git');
        fn();
      } else {
        fn(err);
      }
    });
  } else {
    let downloadOptions = {
      extract: true,
      strip: 1,
      mode: '666',
      ...opts,
      headers: {
        accept: 'application/zip',
        ...(opts.headers || {})
      }
    };
    downloadUrl(url, dest, downloadOptions)
      .then(function (data) {
        fn();
      })
      .catch(function (err) {
        fn(err);
      });
  }
}

/**
 * Normalize a repo string.
 *
 * @param {String} repo
 * @return {Object}
 */

function normalize(repo) {
  let regex = /^(?:(direct):([^#]+)(?:#(.+))?)$/;
  let match = regex.exec(repo);

  if (match) {
    let url = match[2];
    let directCheckout = match[3] || 'master';

    return {
      type: 'direct',
      url,
      checkout: directCheckout
    };
  } else {
    regex = /^(?:(github|gitlab|bitbucket):)?(?:(.+):)?([^/]+)\/([^#]+)(?:#(.+))?$/;
    match = regex.exec(repo);
    let type = match[1] || 'github';
    let origin = match[2] || null;
    let owner = match[3];
    let name = match[4];
    let checkout = match[5] || 'master';

    if (origin == null) {
      if (type === 'github') {
        origin = 'github.com';
      } else if (type === 'gitlab') {
        origin = 'gitlab.com';
      } else if (type === 'bitbucket') {
        origin = 'bitbucket.org';
      }
    }

    return {
      type,
      origin,
      owner,
      name,
      checkout
    };
  }
}

/**
 * Adds protocol to url in none specified
 *
 * @param {String} url
 * @return {String}
 */

function addProtocol(origin, clone) {
  if (!/^(f|ht)tps?:\/\//i.test(origin)) {
    if (clone) {
      origin = 'git@' + origin;
    } else {
      origin = 'https://' + origin;
    }
  }

  return origin;
}

/**
 * Return a zip or git url for a given `repo`.
 *
 * @param {Object} repo
 * @return {String}
 */

function getUrl(repo, clone) {
  let url;

  // Get origin with protocol and add trailing slash or colon (for ssh)
  let origin = addProtocol(repo.origin, clone);
  if (/^git@/i.test(origin)) {
    origin = origin + ':';
  } else {
    origin = origin + '/';
  }

  // Build url
  if (clone) {
    url = `${origin}${repo.owner}/${repo.name}.git`;
  } else {
    switch (repo.type) {
      case 'github':
        url = `${origin}${repo.owner}/${repo.name}/archive/${repo.checkout}.zip`;
        break;
      case 'gitlab':
        url = `${origin}${repo.owner}/${repo.name}/repository/archive.zip?ref=${repo.checkout}`;
        break;
      case 'bitbucket':
        url = `${origin}${repo.owner}/${repo.name}/get/${repo.checkout}.zip`;
        break;
      default:
    }
  }

  return url;
}
