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
describe('Test Feedback Model', () => {
    let user1;
    let course1;
    let feedback;
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
            course1 = await index_3.Course.create({
                title: 'Test Course #1',
                description: 'Test Course #1 Description',
                createdBy: user1.dataValues.id,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
    it('test adding feedback without specifing courseId', async () => {
        const failedFeedback = index_1.Feedback.create({
            comment: 'This is my rating for course #1',
            rating: 4.3,
            userId: user1?.dataValues.id,
        });
        expect(failedFeedback).rejects.toThrow(Error);
    });
    it('test adding feedback without specifing userId', async () => {
        const failedFeedback = index_1.Feedback.create({
            comment: 'This is my rating for course #1',
            rating: 4.3,
            courseId: course1?.dataValues.id,
        });
        expect(failedFeedback).rejects.toThrow(Error);
    });
    it('test adding feedback with invalid courseId', async () => {
        const failedFeedback = index_1.Feedback.create({
            comment: 'This is my rating for course #1',
            rating: 4.3,
            userId: 999999999999,
            courseId: course1?.dataValues.id,
        });
        expect(failedFeedback).rejects.toThrow(Error);
    });
    it('test adding feedback with invalid userId', async () => {
        const failedFeedback = index_1.Feedback.create({
            comment: 'This is my rating for course #1',
            rating: 4.3,
            courseId: 999999999999,
            userId: user1?.dataValues.id,
        });
        expect(failedFeedback).rejects.toThrow(Error);
    });
    it('test adding feedback', async () => {
        feedback = await index_1.Feedback.create({
            comment: 'This is my rating for course #1',
            rating: 4.3,
            courseId: course1?.dataValues.id,
            userId: course1?.dataValues.id,
        });
        expect(feedback).toBeDefined;
        expect(feedback.dataValues.id).toBeGreaterThan(0);
    });
    it('test adding feedback with same userId and courseId', async () => {
        const errorFeedback = index_1.Feedback.create({
            comment: 'This is my rating for course #1',
            rating: 4.3,
            courseId: course1?.dataValues.id,
            userId: course1?.dataValues.id,
        });
        expect(errorFeedback).rejects.toThrow(Error);
        const allFeedback = await index_1.Feedback.findAll();
        expect(allFeedback.length).toBe(1);
    });
});
