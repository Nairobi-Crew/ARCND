const webpackConfigClient = require('./webpack.client');
const webpackConfigServer = require('./webpack.server');

module.exports = [
  webpackConfigClient,
  webpackConfigServer,
];
console.log('Client', webpackConfigClient);
