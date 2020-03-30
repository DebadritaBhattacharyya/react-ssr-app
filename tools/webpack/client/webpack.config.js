const { resolve } = require('path');
const { smart } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod')
    : require('./webpack.dev')

const base = {
  name: 'client',
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: resolve('build', 'public'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'], // The orders are important
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.scss'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: resolve('build/public/webpack-assets.json'),
      filter: file => file.isInitial
    }),
    new LoadablePlugin({
      writeToDisk: true,
      filename: '../public/loadable-stats.json'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 1,
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

module.exports = smart(base, config)