"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class CourseProgressController {
    static async addCourseProgress(ctx) {
        const { userId, courseId, lessonId, completed, progressPercentage, lastAccessedAt, } = ctx.request.body;
        try {
            const progress = await models_1.CourseProgress.create({
                userId,
                courseId,
                lessonId,
                completed,
                progressPercentage,
                lastAccessedAt,
            });
            ctx.body = progress;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editCourseProgress(ctx) {
        const { completed, progressPercentage, lastAccessedAt } = ctx.request
            .body;
        const { userId, courseId, lessonId } = ctx.params;
        try {
            const updatedCourseProgress = models_1.CourseProgress.update({
                completed,
                progressPercentage,
                lastAccessedAt,
            }, { where: { userId, courseId, lessonId } });
            ctx.body = updatedCourseProgress;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteCourseProgress(ctx) {
        const { courseId } = ctx.params;
        try {
            const deletedProgress = await models_1.Course.destroy({
                where: { courseId },
            });
            ctx.body = deletedProgress;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getCourseProgress(ctx) {
        const { userId, courseId, lessonId } = ctx.params;
        try {
            const foundProgress = await models_1.CourseProgress.findOne({
                where: { userId, courseId, lessonId },
            });
            ctx.body = foundProgress;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getCourseProgresses(ctx) {
        try {
            const foundProgresses = await models_1.CourseProgress.findAll();
            ctx.body = foundProgresses;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = CourseProgressController;
