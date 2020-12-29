const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        dist: path.resolve(__dirname, '..', 'dist')
      }
    },
  }
}
