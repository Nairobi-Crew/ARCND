const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ResourcesManifestPlugin = require('resources-manifest-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { isDev } = require('./env.variables');
const babelLoader = require('./webpack.babel');

const resolve = (p) => path.resolve(__dirname, `${p}`);

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    isDev && 'webpack-hot-middleware/client?noInfo=true',
    isDev && 'react-hot-loader/patch',
    isDev && 'css-hot-loader/hotModuleReplacement',
    './src/client/index.tsx',
  ].filter(Boolean),
  output: {
    filename: '[name].js',
    path: isDev ? __dirname : path.join(__dirname, './dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      App: resolve('src/App/'),
      Pages: resolve('src/Pages/'),
      '@': resolve('src/'),
      Components: resolve('src/components/'),
      UI: resolve('src/components/ui/'),
      Config: resolve('src/config/'),
      Util: resolve('src/util/'),
      Common: resolve('src/common/'),
      Store: resolve('src/Store/'),
      Reducers: resolve('src/Store/reducers/'),
      Server: resolve('src/server/'),
    },
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './static', to: './',
        },
      ],
    }),
    new ResourcesManifestPlugin(
      {
        match: {
          TO_CACHE: /.+.(js|css|png|jpe?g|gif|svg|webp)$/,
        },
        swPath: 'src/service-worker.js',
      },
    ),
    isDev ? new webpack.HotModuleReplacementPlugin() : '',
  ].filter(Boolean),
};
