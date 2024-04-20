import { config } from 'dotenv';
config();
import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

if (process.env.NODE_ENV !== 'test') {
  sequelize = new Sequelize(process.env.DATABASE_URL || '', {
    logging: console.log,
    pool: {
      idle: 5000,
      max: 10,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    ssl: true,
  });
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL || '', {
    logging: false,
    pool: {
      idle: 5000,
      max: 10,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    ssl: true,
  });
}

export default sequelize;
