const { merge } = require('webpack-merge');
const common = require('./webpack.config.cjs');
// const webpack = require('webpack');

/**
 *
 * @returns
 */
module.exports = () => (merge(common(), {
  mode: 'development',
  devtool: 'eval-source-map'
}));
