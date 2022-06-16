var path = require('path');
const webpack = require('webpack');

module.exports = {
  target:'web',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname),
    filename: '_bundle.js'
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
    fallback: {
      "stream": false,
      "buffer": false,
    }},

    plugins: [
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
  ],

};
