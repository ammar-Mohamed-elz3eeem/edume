"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const Enrollment = db_1.default.define('Enrollment', {
    enrollment_date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now'),
    },
    completion_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'Courses', key: 'id' },
        allowNull: false,
    },
}, {
    createdAt: false,
    updatedAt: false,
    indexes: [{ fields: ['userId', 'courseId'], unique: true }],
});
exports.default = Enrollment;
