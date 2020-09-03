const path = require('path');
const globalDirectories = require('global-dirs');
const fs = require('fs');

const BALM_CORE_PACKAGE_NAME = 'balm-core';
const BALM_CORE_PACKAGE_JSON = 'package.json';

const localModule = path.join(
  __dirname,
  '..',
  '..',
  BALM_CORE_PACKAGE_NAME,
  BALM_CORE_PACKAGE_JSON
);
const npmGlobalModule = path.join(
  globalDirectories.npm.packages,
  BALM_CORE_PACKAGE_NAME,
  BALM_CORE_PACKAGE_JSON
);
const yarnGlobalModule = path.join(
  globalDirectories.yarn.packages,
  BALM_CORE_PACKAGE_NAME,
  BALM_CORE_PACKAGE_JSON
);

let balmCore;

if (fs.existsSync(localModule)) {
  balmCore = localModule;
} else if (fs.existsSync(npmGlobalModule)) {
  balmCore = npmGlobalModule;
} else if (fs.existsSync(yarnGlobalModule)) {
  balmCore = yarnGlobalModule;
}

let balmPkg = {
  version: 'Unknown'
};

if (balmCore && fs.existsSync(balmCore)) {
  balmPkg = require(balmCore);
}

module.exports = balmPkg;
