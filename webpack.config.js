const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack will take the files from ./client/index
  entry: './client/index.js',
  mode: process.env.NODE_ENV,
  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      crypto: false,
      'crypto-browserify': require.resolve('crypto-browserify'),
    },
  },
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      // sass-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  devServer: {
    publicPath: '/dist',
    proxy: {
      '/': 'http://localhost:3000',
      '/app': 'http://localhost:3000',
      '/psql': 'http://localhost:3000',
      '/mongo': 'http://localhost:3000',
      '/playground': 'http://localhost:3000',
    },
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

/*
* maybe file loader?? 
  {
    test: /.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/,
    loader: 'url-loader?limit=1024000',
  },

*/
