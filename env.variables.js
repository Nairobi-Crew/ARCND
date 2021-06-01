const { _bot_token_ } = require('./bot_token');

const pg_connection_dev = {
  address: '10.0.2.4',
  port: 5432,
  database: 'game',
  user: 'gamer',
  password: 'Pa$SW0r|)',
  ssl: false,
};

const pg_connection_prod = {
  address: process.env.POSTGRES_HOST || 'postgres',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DATABASE || 'game',
  user: process.env.POSTGRES_USERNAME || 'gamer',
  password: process.env.POSTGRES_PASSWORD || 'Pa$SW0r|)',
  ssl: process.env.POSTGRES_SSL || false,
};

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  isDev,
  CLIENT_ID: 'a45f6b218e5d436da82cc542f603245f', // 0e3bdbec820c48a29b1cff6b8bef3754
  serverPort: isDev ? process.env.PORT || 3000 : process.env.PORT || 5000,
  pg_connection: isDev ? pg_connection_dev : pg_connection_prod,
  tg_bot_token: process.env.BOT_TOKEN || _bot_token_,
  force_sync: process.env.FORCE_SYNC === 'yes' || false,
};
