const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ResourcesManifestPlugin = require('resources-manifest-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { isDev } = require('./env.variables');
const babelLoader = require('./webpack.babel');

// console.log(`Mode: ${isDev ? 'DEV' : 'PRODUCTION'}, current folder: ${__dirname} `);

const resolve = (p) => path.resolve(__dirname, `${p}`);

let aliases = {
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
};

if (isDev) {
  aliases = { ...aliases, 'react-dom': '@hot-loader/react-dom' };
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  // watchOptions: {
  //   ignored: [path.join(__dirname, './')],
  // },
  // target: 'node',
  target: 'web',
  entry: [
    // isDev && 'webpack-hot-middleware/client?noInfo=false&path=/__webpack_hmr&timeout=20000&reload=true',
    // isDev && 'webpack-hot-middleware/client?path=/__webpack_hmr_&timeout=20000',
    // isDev && 'webpack-hot-middleware/client?noInfo=true&path=http://localhost:3000/__webpack_hmr',
    isDev && 'webpack-hot-middleware/client?noInfo=true',
    isDev && 'react-hot-loader/patch',
    isDev && 'css-hot-loader/hotModuleReplacement',
    './src/client/index.tsx',
  ].filter(Boolean),
  devtool: 'inline-source-map',
  // devtool: 'source-map',
  // devtool: 'eval-source-map',
  // devtool: false,
  output: {
    // filename: '[name].[contenthash].js',
    filename: '[name].js',
    path: isDev ? path.join(__dirname) : path.join(__dirname, './dist'),
    publicPath: '/',
    // hotUpdateChunkFilename: '[id].[hash].json',
    // hotUpdateMainFilename: '[id].[hash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: aliases,
    plugins: [new TsconfigPathsPlugin({ logLevel: 'info' })],
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
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
    new webpack.WatchIgnorePlugin({ paths: [path.join(__dirname, './'), path.join(__dirname, './dist'), path.join(__dirname, './dist/client'), '/'] }),
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin(),
    // new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
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
