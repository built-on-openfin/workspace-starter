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
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: { fin: 'fin' },
    output: {
      filename: 'salesforce.bundle.js',
      library: {
        type: "module"
      },
      path: path.resolve(__dirname, '..', '..', 'public', 'js', 'integrations'),
    },
    experiments: {
      outputModule: true
    }
  }
];