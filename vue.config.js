module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,

  devServer: {
    open: true,
    port: 1234
  },

  configureWebpack: {
    plugins: []
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
};
