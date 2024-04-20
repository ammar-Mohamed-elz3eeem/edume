"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const User_model_1 = __importDefault(require("./User.model"));
const Course_model_1 = __importDefault(require("./Course.model"));
const Group = db_1.default.define('Group', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: User_model_1.default, key: 'id' },
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: Course_model_1.default, key: 'id' },
        allowNull: false,
    },
});
exports.default = Group;
