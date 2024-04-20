"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const Resource = db_1.default.define('Resource', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('video', 'pdf', 'article', 'image'),
        defaultValue: 'article',
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true },
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'Courses', key: 'id' },
        allowNull: false,
    },
}, { createdAt: false, updatedAt: false });
exports.default = Resource;
