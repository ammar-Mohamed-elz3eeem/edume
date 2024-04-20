"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const Course = db_1.default.define('Course', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    featuredImage: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false,
    },
});
exports.default = Course;
