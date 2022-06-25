const { merge } = require('webpack-merge');
const common = require('./webpack.config.cjs');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { description: appDescription, author } = require('./package.json');

// const webpack = require('webpack');

/**
 *
 * @returns
 */
module.exports = () => (merge(common(), {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new WebpackManifestPlugin({}),
    new FaviconsWebpackPlugin({
      logo: './src/frontend/assets/logo/logo.png',
      inject: true,
      favicons: {
        appDescription,
        developerName: author,
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        version: '1.0',
        logging: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          favicons: true,
          firefox: true,
          windows: false,
          yandex: false
        }
      }
    })
  ]
}));
