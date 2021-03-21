const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = (p) => path.resolve(__dirname, `${p}`);

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    watchContentBase: true,
    progress: true,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  mode: isDev ? 'development' : 'production',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.html'],
    alias: {
      App: resolve('src/App/'),
      Pages: resolve('src/Pages/'),
      '@': resolve('src/'),
      Components: resolve('src/components/'),
      UI: resolve('src/components/ui/'),
      Config: resolve('src/config/'),
    },

  },
  output: {
    filename: 'main.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      }, {
        test: /\.(scss|css)$/,
        use: [!isDev && MiniCssExtractPlugin.loader, !isDev && 'css-loader', 'sass-loader'],
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
