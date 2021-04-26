const { join, resolve } = require('path');
const webpack = require('webpack');

const resolvePath = (p) => resolve(__dirname, `${p}`);

function createConfig({ target }) {
  const root = join(__dirname, '../');
  const src = join(root, 'src');
  // const name = 'main[chunkhash].js';
  const name = '[name].js';

  const dist = join(root, 'dist', target);
  const IS_SERVER = target === 'server';
  const IS_CLIENT = target === 'client';

  const mode = process.argv[process.argv.indexOf('--mode') + 1];
  const isDev = mode === 'development';

  const cfg = {
    name: target,
    entry: join(src, target, 'index.tsx'),
    mode: isDev ? 'development' : 'production',

    output: {
      path: dist,
      filename: name,
      // chunkFilename: name,
    },

    resolve: {
      modules: [
        'node_modules',
        'src',
      ],
      alias: {
        App: resolvePath('../src/App/'),
        Pages: resolvePath('../src/Pages/'),
        '@': resolvePath('../src/'),
        Components: resolvePath('../src/components/'),
        UI: resolvePath('../src/components/ui/'),
        Config: resolvePath('../src/config/'),
        Util: resolvePath('../src/util/'),
        Common: resolvePath('../src/common/'),
        Store: resolvePath('../src/Store/'),
        Reducers: resolvePath('../src/Store/reducers/'),
        Server: resolvePath('../src/server/'),
      },

      extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.html'],
    },

    module: {
      rules: [
        {
          test: /\.ts(x)?$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        IS_CLIENT: JSON.stringify(IS_CLIENT),
        IS_SERVER: JSON.stringify(IS_SERVER),
        'typeof window': JSON.stringify(IS_CLIENT ? 'object' : 'undefined'),
      }),
    ],
  };

  // console.log('Config:', cfg);

  return cfg;
}

module.exports = {
  createConfig,
};
