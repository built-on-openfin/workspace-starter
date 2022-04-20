const path = require('path');

module.exports = [
  {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ],
    },
    experiments: {
      outputModule: true,
    },
    externals: { fin: 'fin' },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'index.js',
      library: {
        type: 'module',
      },
      path: path.resolve(__dirname, 'dist', 'cjs'),
    },
  }
];