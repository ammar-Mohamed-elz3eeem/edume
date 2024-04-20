"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const Course_model_1 = __importDefault(require("./Course.model"));
const Lesson_model_1 = __importDefault(require("./Lesson.model"));
const CourseProgress = db_1.default.define('CourseProgress', {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: User_model_1.default, key: 'id' },
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Course_model_1.default, key: 'id' },
        allowNull: false,
    },
    lessonId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Lesson_model_1.default, key: 'id' },
        allowNull: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    progressPercentage: {
        type: sequelize_1.DataTypes.FLOAT,
        validate: { min: 0, max: 100 },
    },
    lastAccessedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    createdAt: false,
    updatedAt: false,
    indexes: [{ fields: ['userId', 'courseId', 'lessonId'], unique: true }],
});
exports.default = CourseProgress;
