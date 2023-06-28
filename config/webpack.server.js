// const path = require('path');
// const webpackNodeExternals = require('webpack-node-externals');
// const LoadablePlugin = require('@loadable/webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// module.exports = {
//   target: 'node',
//   mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
//   entry: path.resolve(__dirname, '../src/server.js'),
//   output: {
//     filename: 'bundle_server.js',
//     path: path.resolve(__dirname, '../dist'),
//     libraryTarget: 'commonjs2',
//   },
//   node: {
//     __dirname: false,
//     __filename: false,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         exclude: '/node_modules/',
//       },
//     ],
//   },
//   externals: ['@loadable/component', webpackNodeExternals()],
//   plugins: [new LoadablePlugin(), new CleanWebpackPlugin()],
// };


const path = require('path')

const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig('node'), {
  /**
   * `node` settings are required, so that `__dirname` resolves the proper
   * absolute path on the file system.
   *
   * @see https://github.com/webpack/webpack/issues/1599#issuecomment-186841345
   */
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    /**
     * required, or chunkExtractor.requireEntrypoint() does not work.
     * @see https://loadable-components.com/docs/api-loadable-server/#chunkextractorrequireentrypoint
     */
    libraryTarget: 'commonjs2',
  },
  /**
   * Prevent bundling of certain imported packages and instead retrieve these
   * external dependencies at runtime.
   *
   * We must exclude `@loadable/component` from the SSR bundle or loadable
   * components will not be rendered on the SSR properly.
   *
   * E.g. it leads to an "Error: Invariant failed: You should not use <Link>
   * outside a <Router>" error.
   *
   * @see https://webpack.js.org/configuration/externals/
   */
  externals: ['@loadable/component', nodeExternals()],
})
