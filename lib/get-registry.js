const { request } = require('./utils');

const registries = {
  npm: 'https://registry.npmjs.org',
  yarn: 'https://registry.yarnpkg.com',
  taobao: 'https://registry.npm.taobao.org'
};

async function ping(registry) {
  const url = `${registry}/balm-cli/latest`;
  await request.get(url);
  return url;
}

async function getRegistry(done) {
  let faster;

  try {
    faster = await Promise.race([
      ping(registries.npm),
      ping(registries.yarn),
      ping(registries.taobao)
    ]);
  } catch (e) {}

  return faster;
}

module.exports = getRegistry;
