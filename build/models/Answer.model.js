"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const Question_model_1 = __importDefault(require("./Question.model"));
const Answer = db_1.default.define('Answer', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Question_model_1.default, key: 'id' },
        allowNull: false,
    },
});
exports.default = Answer;
