module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        moment: 'moment/src/moment'
      }
    }, module: {
      rules: [
        {
          test: /\.md$/i,
          loader: "raw-loader",
        },
      ],
    },
  },
}
