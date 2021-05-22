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
  serverPort: isDev ? process.env.PORT || 3000 : process.env.PORT || 5000,
  pg_connection: isDev ? pg_connection_dev : pg_connection_prod,
};
