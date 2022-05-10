const path = require('path');

module.exports = {
  entry: './client/src/notifications.ts',
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
    filename: 'notifications.bundle.js',
    path: path.resolve(__dirname,'..', 'public', 'js'),
  },
};