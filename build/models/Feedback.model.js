"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const Course_model_1 = __importDefault(require("./Course.model"));
const Feedback = db_1.default.define('Feedback', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rating: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        defaultValue: '',
        allowNull: true,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Course_model_1.default, key: 'id' },
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Course_model_1.default, key: 'id' },
        allowNull: false,
        primaryKey: true,
    },
}, {
    createdAt: true,
    updatedAt: false,
    indexes: [{ fields: ['courseId', 'userId'], unique: true }],
});
exports.default = Feedback;
