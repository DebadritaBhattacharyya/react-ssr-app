const webpack = require('webpack')
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: [
    // Migrate to react-refresh on its release https://github.com/facebook/react/issues/16604#issuecomment-528663101
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    resolve('app', 'index.tsx'),
  ],
  output: {
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: ['app', 'node_modules'],
    descriptionFiles: ['package.json'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: 'app/index.html',
    }),
  ],
};

module.exports = config
