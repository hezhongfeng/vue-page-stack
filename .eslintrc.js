module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'babel-eslint',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
