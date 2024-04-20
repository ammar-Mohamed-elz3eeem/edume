"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const UserActivity = db_1.default.define('UserActivity', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: User_model_1.default, key: 'id' },
        allowNull: false,
    },
    activityType: {
        type: sequelize_1.DataTypes.ENUM('login', 'course_enrollment', 'course_completed', 'quiz_completed'),
    },
    activityDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now'),
    },
}, { createdAt: false, updatedAt: false });
exports.default = UserActivity;
