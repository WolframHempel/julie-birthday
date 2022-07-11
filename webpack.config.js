const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ['./src/index.js', "./src/styles/main.less"],
  mode: 'development',
  resolve: {
    alias: {
      vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.js')
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath: '/assets/'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['all', 'loca.lt'],
    disableHostCheck: true,
    //public: true,
    proxy: {},
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          }
        ]
      },
    ],
  },
};

