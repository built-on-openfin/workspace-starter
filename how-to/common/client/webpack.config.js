const path = require('path');

module.exports = {
  entry: './client/src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'common.bundle.js',
    path: path.resolve(__dirname,'..', 'public', 'js'),
  },
};