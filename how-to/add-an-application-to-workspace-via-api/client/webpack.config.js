const path = require('path');

module.exports = {
  entry: './client/src/provider.ts',
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
    filename: 'provider.bundle.js',
    path: path.resolve(__dirname,'..', 'public', 'js'),
  },
};

// module.exports = {
//   entry: {
//     provider: './client/build/provider.js'
//   },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, '..', 'public', 'js'),
//     clean: true,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         enforce: "pre",
//         use: [
//           {
//             loader: "source-map-loader",
//                      },
//         ],
//       },
//     ],
//   }
// };
