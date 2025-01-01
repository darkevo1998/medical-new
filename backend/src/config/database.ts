import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://postgres:admin1234@localhost:5432/db',
  {
    dialect: 'postgres',
    logging: false,
  }
);

export { sequelize };
