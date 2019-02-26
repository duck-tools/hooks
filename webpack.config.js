const { resolve } = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname)
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', include: resolve(__dirname, './src') }
    ]
  }
};