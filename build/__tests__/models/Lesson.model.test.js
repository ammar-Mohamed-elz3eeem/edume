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
const index_3 = require("../../models/index");
describe('Test User Mode', () => {
    let user;
    let course;
    let lesson;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
    });
    it('test add lesson', async () => {
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
        lesson = await index_3.Lesson.create({
            title: 'This is #1 Lesson',
            content: 'This is #1 Lesson Content',
            courseId: course?.dataValues.id,
        });
        course = await index_1.Course.findByPk(course.dataValues.id, {
            include: { model: index_3.Lesson, as: 'lessons' },
        });
        expect(course?.dataValues.lessons[0].dataValues.id).toBe(lesson.dataValues.id);
        expect(course?.dataValues.lessons.length).toBe(1);
    });
    it('test add lesson with invalid course id', async () => {
        const failedLesson = index_3.Lesson.create({
            title: 'This is #1 Lesson',
            content: 'This is #1 Lesson Content',
            CourseId: 999999,
        });
        expect(failedLesson).rejects.toThrow(Error);
    });
    it('test add lesson within course', async () => {
        course = await index_1.Course.create({
            title: 'Test Course #2',
            description: 'Test Course #2 Desscription',
            lessons: [
                { title: 'Test Lesson #2', content: 'Test Lesson #2 content' },
                { title: 'Test Lesson #3', content: 'Test Lesson #3 content' },
            ],
            createdBy: user?.dataValues.id,
        }, { include: { model: index_3.Lesson, as: 'lessons' } });
        expect(course.dataValues.lessons.length).toBe(2);
    });
    it('test update lesson', async () => {
        const updatedLesson = await index_3.Lesson.update({
            title: 'Test Lesson #1 Edited',
            description: 'Test Lesson #1 Description Edited',
        }, {
            where: { id: lesson?.dataValues.id },
        });
        expect(updatedLesson[0]).toBeGreaterThan(0);
    });
    it('test get course', async () => {
        const foundLesson = await index_3.Lesson.findOne({
            where: { id: lesson?.dataValues.id },
        });
        expect(foundLesson?.dataValues.id).toBe(lesson?.dataValues.id);
        expect(foundLesson?.dataValues.title).toBe('Test Lesson #1 Edited');
    });
    it('test delete user', async () => {
        const deletedLesson = await index_3.Lesson.destroy({
            where: { id: lesson?.dataValues.id },
        });
        expect(deletedLesson).toBeGreaterThan(0);
    });
});
