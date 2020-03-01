const { chalk, semver, request } = require('./utils');
const getRegistry = require('./get-registry');
const packageJson = require('../package.json');

async function checkVersion(done) {
  // Ensure minimum supported node version is used
  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    return console.log(
      chalk.red(
        '  You must upgrade node to >=' +
          packageJson.engines.node +
          '.x to use balm-cli'
      )
    );
  }

  const url = await getRegistry();

  try {
    request.get(url).then(({ statusCode, body }) => {
      const latestVersion = body['dist-tags'].latest;
      const localVersion = packageJson.version;

      if (semver.lt(localVersion, latestVersion)) {
        console.log(
          chalk.yellow('  A newer version of balm-cli is available.')
        );
        console.log();
        console.log('  latest:    ' + chalk.green(latestVersion));
        console.log('  installed: ' + chalk.red(localVersion));
        console.log();
      }

      done();
    });
  } catch (e) {
    error(`Failed to get response from ${url}`);
    throw e;
  }
}

module.exports = checkVersion;
