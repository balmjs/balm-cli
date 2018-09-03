module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ]
  }
};
