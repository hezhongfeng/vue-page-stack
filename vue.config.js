module.exports = {
  css: { 
    extract: false 
  },
  productionSourceMap: true,
  configureWebpack: {
    output: {
      library: 'VuePageStack',
      libraryExport: 'default'
    }
  }
};
