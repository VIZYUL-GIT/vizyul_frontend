const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');

var fs = require('fs');
var path = require('path');

module.exports = env => {
  return {
    externals: {
      config: JSON.stringify(require('./config/'+env.NODE_ENV+'.json'))
    },
    entry: [
      './src/index.js',
    ],
    output: {
      path: path.resolve(__dirname, "build"),
      publicPath:'/vizual/',
      filename: 'index_bundle.js'
    },
    module: {
      rules: [
        {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.css$/,
        loader: ['style-loader','css-loader'],
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg|gif|svg|otf)$/,
        use: [
          {
          loader: 'file-loader',
          options: {}
        }
        ]
      }
      ],
    },
    devServer: {
      inline: true,
      port: 8008,
      historyApiFallback: true,
      contentBase: path.join(__dirname, './build'),
    },
    plugins: [
      new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new BaseHrefWebpackPlugin({ baseHref: '/vizual/' }),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
  };
}
