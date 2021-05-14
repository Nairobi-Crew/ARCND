import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { pg_connection } from '../../../env.variables';

const options: SequelizeOptions = {
  database: pg_connection.database,
  port: parseInt(pg_connection.port.toString(), 10),
  username: pg_connection.user,
  password: pg_connection.password,
  host: pg_connection.address,
  dialect: 'postgres',
  ssl: pg_connection.ssl as boolean,
};

const sequelize = new Sequelize(options);

export default sequelize;
