"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelize_1 = require("sequelize");
let sequelize;
if (process.env.NODE_ENV !== 'test') {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || '', {
        logging: console.log,
        pool: {
            idle: 5000,
            max: 10,
        },
    });
}
else {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL || '', {
        logging: false,
        pool: {
            idle: 5000,
            max: 10,
        },
    });
}
exports.default = sequelize;
