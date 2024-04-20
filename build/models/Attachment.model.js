"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const Attachment = db_1.default.define('Attachment', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    src: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('pdf', 'image', 'video'),
        allowNull: false,
        defaultValue: 'image',
    },
    lessonId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Lessons', key: 'id' },
    },
});
exports.default = Attachment;
