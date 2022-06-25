const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 *
 * @returns {*}
 */
module.exports = () => ({
  entry: './src/frontend/index.js',
  output: {
    path: resolve(__dirname, 'src/public'),
    filename: 'script.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'App',
      template: 'src/frontend/html-templates/index.ejs',
      cache: false,
      inject: 'body',
      showErrors: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: [
                      'last 2 Chrome versions'
                    ]
                  }
                }
              ]

            ],
            plugins: [
              [
                '@babel/plugin-proposal-decorators',
                {
                  decoratorsBeforeExport: true
                }
              ],
              '@babel/plugin-proposal-class-properties',
              [
                '@babel/plugin-transform-runtime',
                {
                  helpers: false,
                  regenerator: true
                }
              ],
              [
                '@babel/plugin-proposal-object-rest-spread',
                {
                  useBuiltIns: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.worker\.js$/, // matches files like *.worker.js
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.partial\.ejs$/,
        loader: 'ejs-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /above\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head',
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /below\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'body',
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
});
