module.exports = {
  root: true,
  env: { browser: true, node: true, es6: true },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['dist/']
};
