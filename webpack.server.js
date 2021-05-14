const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { isDev } = require('./env.variables');
const babelLoader = require('./webpack.babel');

console.log('Server config used...');

const resolve = (p) => path.resolve(__dirname, `${p}`);

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server/index.tsx',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, './dist'),
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
        use: [
          'css-loader',
          {
            loader: 'null-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'null-loader',
          },
        ],
      },
    ],
  },
};
