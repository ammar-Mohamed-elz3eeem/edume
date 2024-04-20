"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class QuestionsController {
    static async addQuestion(ctx) {
        const { title, quizId, answers } = ctx.request.body;
        try {
            const addedQuestion = models_1.Question.create({ title, quizId, answers }, { include: { model: models_1.Answer, as: 'answers' } });
            return addedQuestion;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editQuestion(ctx) {
        const { title } = ctx.request.body;
        const { questionId } = ctx.params;
        try {
            const editedQuuestion = models_1.Question.update({ title }, { where: { id: questionId } });
            ctx.body = editedQuuestion;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteQuiz(ctx) {
        const { questionId } = ctx.params;
        try {
            const deletedQuestion = models_1.Question.destroy({ where: { id: questionId } });
            ctx.body = deletedQuestion;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getQuiz(ctx) {
        const { questionId } = ctx.params;
        try {
            const editedQuiz = models_1.Question.findByPk(questionId);
            ctx.body = editedQuiz;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getQuestions(ctx) {
        try {
            const questions = models_1.Question.findAll();
            ctx.body = questions;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = QuestionsController;
