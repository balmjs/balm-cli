const path = require('path');
const globalDirectories = require('global-dirs');
const fs = require('fs');
const { execSync } = require('child_process');

const BALM_CORE_PACKAGE_NAME = 'balm-core';
const BALM_CORE_PACKAGE_JSON = 'package.json';

const localModule = path.join(
  process.cwd(),
  'node_modules',
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
let balmPkg = {
  version: 'Unknown'
};
let isLocal = false;

if (fs.existsSync(localModule)) {
  balmCore = localModule;
  isLocal = true;
} else if (fs.existsSync(npmGlobalModule)) {
  balmCore = npmGlobalModule;
} else if (fs.existsSync(yarnGlobalModule)) {
  balmCore = yarnGlobalModule;
} else {
  const packages = execSync('npm root --global').toString().trim();
  balmCore = path.join(
    packages,
    BALM_CORE_PACKAGE_NAME,
    BALM_CORE_PACKAGE_JSON
  );
}

if (balmCore && fs.existsSync(balmCore)) {
  balmPkg = require(balmCore);
  balmPkg.isLocal = isLocal;
}

module.exports = balmPkg;
