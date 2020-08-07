const fs = require('fs');
const { extname } = require('path');
const yaml = require('yaml-js');

/**
 * Return a parser for a given `file`.
 *
 * @param {String} file
 * @return {Function}
 */

function parser(file) {
  switch (extname(file)) {
    case '.json':
      return JSON.parse;
    case '.yaml':
    case '.yml':
      return yaml.load;
  }
}

/**
 * Read a metadata file by `path` and callback `done(err, obj)`.
 *
 * @param {String} path
 * @param {Function} done
 */

function readMetadata(path, done) {
  fs.readFile(path, 'utf-8', function (err, data) {
    if (err) return done(err);
    let parse = parser(path);
    if (!parse) return done(new Error('Invalid metadata file type.'));
    done(null, parse(data));
  });
}

module.exports = exports = readMetadata;

/**
 * Read a metadata file synchronously by `path`.
 *
 * @param {String} path
 * @return {Object}
 */

exports.sync = function (path) {
  let parse = parser(path);
  if (!parse) throw new Error('Invalid metadata file type.');
  let data = fs.readFileSync(path, 'utf-8');
  return parse(data);
};
