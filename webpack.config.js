/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const profileConfig = require('./config');

module.exports = {

  devtool: 'source-map',

  entry: path.join(__dirname, 'assets', 'main.js'),

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
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
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
    }, {
      test: /\.ttf$|\.eot$/,
      loader: 'file',
      query: {
        name: 'font/[hash].[ext]'
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
    new CopyPlugin([ { from: 'assets/images/icons', to: 'images/icons' } ]),
    new webpack.optimize.UglifyJsPlugin({
      screwIe8: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlPlugin(Object.assign({
      title: 'HWdTech Card',
      filename: 'index.html',
      favicon: 'assets/images/favicon.ico',
      template: 'assets/templates/index.pug'
    }, profileConfig)),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240
    }),
    new OfflinePlugin({
      caches: {
        main: ['index.html', 'bundle.*', 'manifest.json']
      },
      AppCache: null,
      publicPath: '/hwdtech-card',
      updateStrategy: 'all',
      ServiceWorker: {
        output: 'sw.js'
      }
    })
  ]
};

