"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("@/db"));
const sequelize_1 = require("sequelize");
const CourseTag = db_1.default.define('CourseTag', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, { createdAt: false, updatedAt: false });
exports.default = CourseTag;
