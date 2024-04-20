"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const Quiz_model_1 = __importDefault(require("./Quiz.model"));
const Question = db_1.default.define('Question', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quizId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Quiz_model_1.default, key: 'id' },
        allowNull: false,
    },
});
exports.default = Question;
