/* eslint-env node */

const map = require('lodash/map');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const profileConfigs = require('require-all')({
  dirname: __dirname + '/config',
  filter: /(.+)\.js$/,
  recursive: true
});

module.exports = {
  entry: path.join(__dirname, 'assets', 'main.js'),

  devtool: 'source-map',

  output: {
    path: 'dist',
    publicPath: '/hwdtech-card/',
    filename: 'bundle-[hash].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'assets'),
      loader: 'babel'
    }, {
      test: /\.pug/,
      loader: 'pug'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css?minimize', 'postcss', 'sass'])
    }, {
      test: /\.woff$/,
      loader: 'url',
      query: {
        name: 'font/[hash].[ext]',
        limit: 5000,
        mimetype: 'application/font-woff'
      }
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/,
      loader: 'file',
      query: {
        name: 'images/[hash].[ext]'
      }
    }]
  },

  postcss: () => [autoprefixer],

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new CopyPlugin([{
      from: 'assets/images/icons',
      to: 'images/icons'
    }]),
    new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      compress: {
        warnings: false
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240
    })
  ]
    .concat(
      map(profileConfigs, (config, username) => new HtmlPlugin(Object.assign({
        title: 'HWdTech Card',
        filename: `${username}.html`,
        favicon: 'assets/images/favicon.ico',
        template: 'assets/templates/index.pug'
      }, config.profile)))
    )
};

