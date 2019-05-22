const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

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

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('example'));
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [
            path.resolve(__dirname, './example/common/style/color.scss'),
          ]
        })
        .end();
    });
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
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
