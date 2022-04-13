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
        },
        {
          test: /\.(zip)/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          }
        }
 
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'provider.bundle.js',
      path: path.resolve(__dirname, '..', 'public', 'js'),
    },
  },
  {
    entry: './client/src/integrations/salesforce.ts',
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
      library: {
        name: 'integration_salesforce',
        type: 'window'
      },
      filename: 'salesforce.bundle.js',
      path: path.resolve(__dirname, '..', 'public', 'js'),
    },
  }

];