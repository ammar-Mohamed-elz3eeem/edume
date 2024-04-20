"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = __importDefault(require("../../db"));
const index_1 = require("../../models/index");
const index_2 = require("../../models/index");
describe('Test User Mode', () => {
    let user;
    let course;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
    });
    it('test add course', async () => {
        user = await index_2.User.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
        course = await index_1.Course.create({
            title: 'Test Course #1',
            description: 'Test Course #1 Description',
            createdBy: user.dataValues.id,
        });
        expect(course.dataValues.id).toBeGreaterThan(0);
        expect(course.dataValues.createdBy).toBe(user.dataValues.id);
    });
    it('test update course', async () => {
        const updatedCourse = await index_1.Course.update({
            title: 'Test Course #1 Edited',
            description: 'Test Course #1 Description Edited',
        }, {
            where: { id: course.dataValues.id },
        });
        expect(updatedCourse[0]).toBeGreaterThan(0);
    });
    it('test get course', async () => {
        const foundCourse = await index_1.Course.findOne({
            where: { id: course.dataValues.id },
        });
        expect(foundCourse?.dataValues.id).toBe(course.dataValues.id);
        expect(foundCourse?.dataValues.title).toBe('Test Course #1 Edited');
    });
    it('test delete user', async () => {
        const deletedcourse = await index_1.Course.destroy({
            where: { id: course.dataValues.id },
        });
        expect(deletedcourse).toBeGreaterThan(0);
    });
});
