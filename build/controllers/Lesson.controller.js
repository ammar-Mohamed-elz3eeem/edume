"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class LessonController {
    static async addLesson(ctx) {
        try {
            const { title, content, courseId } = ctx.request.body;
            const newLesson = await models_1.Lesson.create({ title, content, courseId });
            ctx.body = newLesson;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editLesson(ctx) {
        try {
            const { title, content } = ctx.request.body;
            const { lessonId } = ctx.params;
            const editedLesson = await models_1.Lesson.update({ title, content }, { where: { id: lessonId } });
            ctx.body = editedLesson;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteLesson(ctx) {
        try {
            const { lessonId } = ctx.params;
            const deletedLesson = await models_1.Lesson.destroy({ where: { id: lessonId } });
            ctx.body = deletedLesson;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getLesson(ctx) {
        try {
            const { lessonId } = ctx.params;
            const foundLesson = await models_1.Lesson.findOne({ where: { id: lessonId } });
            ctx.body = foundLesson;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getLessons(ctx) {
        try {
            const foundLessons = await models_1.Lesson.findAll();
            ctx.body = foundLessons;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = LessonController;
