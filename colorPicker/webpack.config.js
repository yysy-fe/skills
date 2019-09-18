const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './src/entry.js',
  mode: 'development',
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.less$/, use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'less-loader' },
      ]},
      { test: /\.css$/, use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }
      ]},
      { test: /\.ejs$/, use: {loader: 'ejs-loader?variable=data'} },
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'htmlParser',
      template: path.join(__dirname, "src/common/template.ejs"),
      hash: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    hot: true
  }
};

module.exports = config;
