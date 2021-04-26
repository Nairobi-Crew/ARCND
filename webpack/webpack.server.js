const config = require('./webpack.common').createConfig({
  target: 'server',
});

module.exports = {
  ...config,

  module: {
    ...config.module,

    rules: [
      ...config.module.rules,

      {
        test: /\.(scss|css)$/,
        use: 'null-loader',
      },
    ],
  },

  externals: {
    express: 'commonjs express',
    react: 'commonjs react',
    'react-dom/server': 'commonjs react-dom/server',
    'react-router': 'commonjs react-router',
    'react-router-dom': 'commonjs react-router-dom',
  },
};
