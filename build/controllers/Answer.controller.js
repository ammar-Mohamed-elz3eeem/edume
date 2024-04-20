"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
class AnswerController {
    static async addAnswer(ctx) {
        const { content, isCorrect, questionId } = ctx.request.body;
        try {
            const addedAnswer = index_1.Answer.create({ content, isCorrect, questionId });
            ctx.body = addedAnswer;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editAnswer(ctx) {
        const { id } = ctx.params;
        const { content, isCorrect } = ctx.request.body;
        try {
            const editedAnswer = index_1.Answer.update({ content, isCorrect }, { where: { id: id } });
            ctx.body = editedAnswer;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteAnswer(ctx) {
        const { id } = ctx.params;
        try {
            const deletedAnswer = index_1.Answer.destroy({ where: { id: id } });
            ctx.body = deletedAnswer;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getAnswer(ctx) {
        const { id } = ctx.params;
        try {
            const answer = await index_1.Answer.findByPk(id);
            ctx.body = answer;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getAnswers(ctx) {
        try {
            const answer = await index_1.Answer.findAll();
            ctx.body = answer;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = AnswerController;
