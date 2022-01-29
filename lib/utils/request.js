import { createRequire } from 'node:module';

const requireModule = createRequire(import.meta.url);

export default {
  get(uri, opts) {
    // Lazy require
    const request = requireModule('request-promise-native');
    const reqOpts = {
      method: 'GET',
      timeout: 30000,
      resolveWithFullResponse: true,
      json: true,
      uri,
      ...opts
    };

    return request(reqOpts);
  }
};
