const pg_connection_dev = {
  address: process.env.PG_USER || '10.0.2.4',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DB || 'game',
  user: process.env.PG_USER || 'gamer',
  password: process.env.PG_PASS || 'Pa$SW0r|)',
  ssl: process.env.PG_SSL || false,
};

const pg_connection_prod = {
  address: process.env.PG_USER || '10.0.2.4',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DB || 'game',
  user: process.env.PG_USER || 'gamer',
  password: process.env.PG_PASS || 'Pa$SW0r|)',
  ssl: process.env.PG_SSL || true,
};

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  isDev,
  serverPort: process.env.PORT || 3000,
  pg_connection: isDev ? pg_connection_dev : pg_connection_prod,
};
