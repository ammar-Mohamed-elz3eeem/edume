"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = __importDefault(require("@/db"));
const index_1 = require("@/models/index");
const index_2 = require("@/models/index");
const index_3 = require("@/models/index");
const index_4 = require("@/models/index");
describe('Test Quiz Model', () => {
    let user;
    let course;
    let quiz;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
        user = await index_3.User.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
        course = await index_1.Course.create({
            title: 'Course #4',
            description: 'Course #4 Description',
            createdBy: user.dataValues.id,
        });
    });
    it('Add Quiz with without course id', async () => {
        const failedQuiz = index_2.Quiz.create({
            title: '#1 Quiz',
        });
        expect(failedQuiz).rejects.toThrow(Error);
    });
    it('Add Quiz with invalid course id', async () => {
        const failedQuiz = index_2.Quiz.create({
            title: '#1 Quiz',
            courseId: 999999999,
        });
        expect(failedQuiz).rejects.toThrow(Error);
    });
    it('Add Quiz with valid course id', async () => {
        quiz = await index_2.Quiz.create({
            title: '#1 Quiz',
            courseId: course.dataValues.id,
        });
        expect(quiz.dataValues.id).toBeGreaterThan(0);
    });
    it('Add Questions to Quiz', async () => {
        const quizWithQuestions = await index_2.Quiz.create({
            title: '#1 Quiz',
            courseId: course.dataValues.id,
            questions: [
                { content: 'This is Question #1' },
                { content: 'This is Question #2' },
            ],
        }, { include: { model: index_4.Question, as: 'questions' } });
        expect(quizWithQuestions.dataValues.questions.length).toBe(2);
    });
});
