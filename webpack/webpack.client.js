const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ResourcesManifestPlugin = require('resources-manifest-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const config = require('./webpack.common').createConfig({
  target: 'client',
});

module.exports = {
  ...config,
  watchOptions: {
    ignored: [
      '**/node_modules',
      'resources-manifest.json',
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchContentBase: true,
    progress: true,
    hot: true,
    open: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: [
        'resources-manifest.json',
      ],
    },
  },

  module: {
    ...config.module,

    rules: [
      ...config.module.rules,
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'vendor',
          name: '[name].[ext]',
          esModule: false,
        },
      },
    ],
  },

  plugins: [
    ...config.plugins,

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'style.[contenthash].css',
      filename: 'style.css',
    }),
    // new HtmlWebpackPlugin({
    //   template: './public/index.html',
    //   favicon: './public/favicon.ico',
    // }),
    new ResourcesManifestPlugin(
      {
        match: {
          TO_CACHE: /.+.(js|css|png|jpe?g|gif|svg|webp)$/,
        },
        swPath: 'src/service-worker.js',
      },
    ),
  ],
};
