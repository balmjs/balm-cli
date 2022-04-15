import { createRequire } from 'node:module';
import { chalk, semver, request } from './utils/index.js';
import getRegistry from './registry.js';

const requireModule = createRequire(import.meta.url);
const pkg = requireModule('../package.json');

async function checkVersion(done) {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, pkg.engines.node)) {
    return console.log(
      chalk.red(
        '  You must upgrade node to >=' +
          pkg.engines.node +
          '.x to use balm-cli'
      )
    );
  }

  const url = await getRegistry();

  try {
    const { version } = await request.get(url);

    const latestVersion = version;
    const localVersion = pkg.version;

    if (semver.lt(localVersion, latestVersion)) {
      console.log(chalk.yellow('  A newer version of balm-cli is available.'));
      console.log();
      console.log('  latest:    ' + chalk.green(latestVersion));
      console.log('  installed: ' + chalk.red(localVersion));
      console.log();
    }

    done();
  } catch (e) {
    console.error(`Failed to get response from ${url}`);
    throw e;
  }
}

export default checkVersion;
