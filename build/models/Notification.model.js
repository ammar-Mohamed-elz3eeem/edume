"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const Notification = db_1.default.define('Notification', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: User_model_1.default, key: 'id' },
        allowNull: false,
    },
}, { createdAt: true, updatedAt: false });
exports.default = Notification;
