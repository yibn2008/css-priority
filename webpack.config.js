'use strict'

const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, 'src/index.js')
  },
  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'umd',
    library: 'cssPriority',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          compact: false,
          presets: [
            'es2015',
            'stage-0'
          ],
          plugins: [
            'add-module-exports'
          ]
        }
      }
    ]
  }
}
