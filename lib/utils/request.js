import fetch from 'node-fetch';

export default {
  async get(url) {
    const response = await fetch(url);

    return response.json();
  }
};
