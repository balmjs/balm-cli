module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  plugins: ['prettier'],
  extends: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ]
  }
};
