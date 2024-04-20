"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = __importDefault(require("../../db"));
const index_1 = require("../../models/index");
const index_2 = require("../../models/index");
const index_3 = require("../../models/index");
describe('Test Enrollment Model', () => {
    let user1;
    let user2;
    let user3;
    let course1;
    let course2;
    let course3;
    let enrollment;
    beforeAll(async () => {
        try {
            await db_1.default.authenticate();
            await db_1.default.sync({ force: true });
            user1 = await index_2.User.create({
                firstName: 'ammar',
                lastName: 'Massoud',
                username: 'test-user-1',
                email: 'test1@gmail.com',
                password: '158269347',
            });
            user2 = await index_2.User.create({
                firstName: 'ammar',
                lastName: 'Massoud',
                username: 'test-user-2',
                email: 'test2@gmail.com',
                password: '158269347',
            });
            user3 = await index_2.User.create({
                firstName: 'ammar',
                lastName: 'Massoud',
                username: 'test-user-3',
                email: 'test3@gmail.com',
                password: '158269347',
            });
            course1 = await index_1.Course.create({
                title: 'Test Course #1',
                description: 'Test Course #1 Description',
                createdBy: user1.dataValues.id,
            });
            course2 = await index_1.Course.create({
                title: 'Test Course #2',
                description: 'Test Course #2 Description',
                createdBy: user1.dataValues.id,
            });
            course3 = await index_1.Course.create({
                title: 'Test Course #3',
                description: 'Test Course #3 Description',
                createdBy: user2.dataValues.id,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    it('enroll 3 users on only one course', async () => {
        const allUsers = await index_2.User.findAll();
        const allCourses = await index_1.Course.findAll();
        expect(allUsers.length).toBeGreaterThanOrEqual(3);
        expect(allCourses.length).toBeGreaterThanOrEqual(3);
        const userEnrollments = index_3.Enrollment.bulkCreate([
            {
                courseId: course1?.dataValues.id,
                userId: user1?.dataValues.id,
            },
            {
                courseId: course1?.dataValues.id,
                userId: user2?.dataValues.id,
            },
            {
                courseId: course1?.dataValues.id,
                userId: user3?.dataValues.id,
            },
        ]);
        const getUserWithEnrollments = await index_2.User.findByPk(user1?.dataValues.id, {
            include: [{ model: index_3.Enrollment, as: 'enrollments' }],
        });
        expect(getUserWithEnrollments?.dataValues.enrollments.length).toBe(1);
        const getCourseWithEnrollments = await index_1.Course.findByPk(course1?.dataValues.id, {
            include: [{ model: index_3.Enrollment, as: 'enrollments' }],
        });
        expect(getCourseWithEnrollments?.dataValues.enrollments.length).toBe(3);
    });
    it('enroll all users on all courses', async () => {
        try {
            const userEnrollments = await index_3.Enrollment.bulkCreate([
                {
                    courseId: course2?.dataValues.id,
                    userId: user1?.dataValues.id,
                },
                {
                    courseId: course2?.dataValues.id,
                    userId: user2?.dataValues.id,
                },
                {
                    courseId: course2?.dataValues.id,
                    userId: user3?.dataValues.id,
                },
                {
                    courseId: course3?.dataValues.id,
                    userId: user1?.dataValues.id,
                },
                {
                    courseId: course3?.dataValues.id,
                    userId: user2?.dataValues.id,
                },
                {
                    courseId: course3?.dataValues.id,
                    userId: user3?.dataValues.id,
                },
            ]);
            enrollment = userEnrollments[0].dataValues;
            expect((await index_3.Enrollment.findAll()).length).toBe(9);
            const allCourses = await index_1.Course.findAll({
                include: { model: index_3.Enrollment, as: 'enrollments' },
            });
            const allUsers = await index_1.Course.findAll({
                include: { model: index_3.Enrollment, as: 'enrollments' },
            });
            allCourses.forEach((course) => expect(course.dataValues.enrollments.length).toBe(3));
            allUsers.forEach((user) => expect(user.dataValues.enrollments.length).toBe(3));
        }
        catch (error) {
            console.log(error);
        }
    });
    it('test finishing course by setting completion_date', async () => {
        const enrollment = await index_3.Enrollment.update({ completion_date: new Date() }, {
            where: {
                userId: user1?.dataValues.id,
                courseId: course1?.dataValues.id,
            },
        });
        expect(enrollment[0]).toBe(1);
        const getUserFinishedCourse = await index_2.User.findByPk(user1?.dataValues.id, {
            include: [
                {
                    model: index_3.Enrollment,
                    as: 'enrollments',
                    where: { completion_date: { [sequelize_1.Op.not]: null } },
                },
            ],
        });
        expect(getUserFinishedCourse?.dataValues.enrollments.length).toBe(1);
    });
});
