/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, node: true },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['dist/']
};
