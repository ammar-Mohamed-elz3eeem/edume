"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class QuizController {
    static async addQuiz(ctx) {
        const { title, courseId, questions } = ctx.request.body;
        try {
            const addedQuiz = models_1.Quiz.create({ title, questions, courseId }, { include: { model: models_1.Question, as: 'questions' } });
            return addedQuiz;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editQuiz(ctx) {
        const { title } = ctx.request.body;
        const { quizId } = ctx.params;
        try {
            const editedQuiz = models_1.Quiz.update({ title }, { where: { id: quizId } });
            ctx.body = editedQuiz;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteQuiz(ctx) {
        const { quizId } = ctx.params;
        try {
            const deletedQuiz = models_1.Quiz.destroy({ where: { id: quizId } });
            ctx.body = deletedQuiz;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getQuiz(ctx) {
        const { quizId } = ctx.params;
        try {
            const editedQuiz = models_1.Quiz.findByPk(quizId);
            ctx.body = editedQuiz;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getQuizes(ctx) {
        try {
            const quizzies = models_1.Quiz.findAll();
            ctx.body = quizzies;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = QuizController;
