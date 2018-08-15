const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry:'./index.ts',
  devtool: '#sourcemap',
  output: {
    filename: './main.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    open: true
  },
  resolve: {
    extensions: [ '.ts', 'tsx', '.js'],
    alias: {
      src: path.join(__dirname, 'src'),
      models: path.join(__dirname, 'src/models')
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}