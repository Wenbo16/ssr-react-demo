const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, '../src/server.js'),
  output: {
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  externals: ['@loadable/component', webpackNodeExternals()],
  plugins: [new LoadablePlugin(), new CleanWebpackPlugin()],
};
