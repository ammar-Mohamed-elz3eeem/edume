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
const index_4 = require("../../models/index");
describe('Test User Mode', () => {
    let user;
    let course;
    let lesson;
    let progress;
    beforeAll(async () => {
        try {
            await db_1.default.authenticate();
            await db_1.default.sync({ force: true });
        }
        catch (error) {
            console.log(error);
        }
    });
    it('test add progress for course', async () => {
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
            courseId: course.dataValues.id,
        });
        lesson = await index_3.Lesson.create({
            title: 'This is #2 Lesson',
            content: 'This is #2 Lesson Content',
            courseId: course.dataValues.id,
        });
        lesson = await index_3.Lesson.create({
            title: 'This is #3 Lesson',
            content: 'This is #3 Lesson Content',
            courseId: course.dataValues.id,
        });
        const courseWithLessons = await index_1.Course.findByPk(course.dataValues.id, {
            include: { model: index_3.Lesson, as: 'lessons' },
        });
        progress = await index_4.CourseProgress.create({
            userId: user.dataValues.id,
            lessonId: lesson.dataValues.id,
            courseId: course.dataValues.id,
            completed: true,
            progressPercentage: ((1 / courseWithLessons?.dataValues.lessons.length) *
                100).toFixed(2),
        });
        expect(progress?.dataValues.id).toBeGreaterThan(0);
    });
    it('test add lesson with invalid course id', async () => {
        const foundPorgress = index_4.CourseProgress.create({
            userId: user?.dataValues.id,
            lessonId: 999999999,
            courseId: course?.dataValues.id,
        });
        expect(foundPorgress).rejects.toThrow(Error);
    });
    it('test update course progress', async () => {
        const updatedProgress = await index_4.CourseProgress.update({
            lastAccessedAt: new Date(),
            userId: user?.dataValues.id,
            lessonId: lesson?.dataValues.id,
            courseId: course?.dataValues.id,
            progressPercentage: 90,
            completed: false,
        }, {
            where: { id: progress?.dataValues.id },
        });
        expect(updatedProgress[0]).toBeGreaterThan(0);
    });
    it('test get course', async () => {
        const foundProgress = await index_4.CourseProgress.findOne({
            where: {
                lessonId: lesson?.dataValues.id,
                courseId: course?.dataValues.id,
                userId: user?.dataValues.id,
            },
        });
        expect(foundProgress?.dataValues.id).toBe(progress?.dataValues.id);
        expect(foundProgress?.dataValues.progressPercentage).toBe(90);
    });
    it('test delete user', async () => {
        const deletedProgress = await index_4.CourseProgress.destroy({
            where: {
                lessonId: lesson?.dataValues.id,
                courseId: course?.dataValues.id,
                userId: user?.dataValues.id,
            },
        });
        expect(deletedProgress).toBeGreaterThan(0);
    });
});
