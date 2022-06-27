const path = require('path');

module.exports = [
  {
    entry: './client/src/provider.ts',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'provider.bundle.js',
      path: path.resolve(__dirname, '..', 'public', 'js')
    }
  },
  {
    entry: './client/src/platform-window.ts',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'platform-window.bundle.js',
      path: path.resolve(__dirname, '..', 'public', 'js')
    }
  }
];
