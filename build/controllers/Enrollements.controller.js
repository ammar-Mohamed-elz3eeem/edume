"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class EnrollmentController {
    static async enrollCourse(ctx) {
        const { userId, courseId } = ctx.params;
        try {
            const enrolled = await models_1.Enrollment.create({ userId, courseId });
            ctx.body = enrolled;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async finishCourse(ctx) {
        const { userId, courseId } = ctx.params;
        try {
            const finished = models_1.Enrollment.update({ completion_date: new Date() }, { where: { courseId, userId } });
            ctx.body = finished;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = EnrollmentController;
