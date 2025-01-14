module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    open: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm-bundler.js',
      },
    },
  },
};