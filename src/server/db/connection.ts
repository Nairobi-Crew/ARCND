import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const options: SequelizeOptions = {
  database: 'game' || process.env.DBNAME,
  port: 5432 || parseInt(process.env.DBPORT as string, 10),
  username: 'gamer' || process.env.DBUSER,
  password: 'Pa$SW0r|)' || process.env.DBPASSWORD,
  host: '10.0.2.4' || process.env.DBHOST,
  dialect: 'postgres',
};

const sequelize = new Sequelize(options);

export default sequelize;
