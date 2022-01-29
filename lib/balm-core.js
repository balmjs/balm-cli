import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import globalDirectories from 'global-dirs';

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

const getBalmPackage = async () => {
  let balmPkg = {
    version: 'Unknown'
  };

  if (balmCore && fs.existsSync(balmCore)) {
    balmPkg = await import(balmCore);
    balmPkg.isLocal = isLocal;
  }

  return balmPkg;
};

export default getBalmPackage();
