"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class FeedbackController {
    static async addFeedback(ctx) {
        try {
            const { userId, courseId, comment, rating } = ctx.request
                .body;
            const feedback = models_1.Feedback.create({ userId, comment, rating, courseId });
            ctx.body = feedback;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editFeedback(ctx) {
        try {
            const { userId, comment, rating } = ctx.request.body;
            const feedbackId = ctx.params.id;
            const isUpdated = models_1.Feedback.update({ userId, comment, rating }, { where: { id: feedbackId } });
            ctx.body = isUpdated;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteFeedback(ctx) {
        try {
            const feedbackId = ctx.params.id;
            const isDeleted = models_1.Feedback.destroy({ where: { id: feedbackId } });
            ctx.body = isDeleted;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getFeedback(ctx) {
        try {
            const feedbackId = ctx.params.id;
            const foundFeedback = models_1.Feedback.findByPk(feedbackId);
            ctx.body = foundFeedback;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getFeedbacks(ctx) {
        try {
            const foundFeedbacks = models_1.Feedback.findAll();
            ctx.body = foundFeedbacks;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = FeedbackController;
