"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class UserController {
    static async editUser(ctx) {
        try {
            const updatedUser = await models_1.User.update(ctx.request.body, { where: { id: ctx.params.id } });
            ctx.body = updatedUser;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteUser(ctx) {
        try {
            const deletedUser = await models_1.User.destroy({ where: { id: ctx.params.id } });
            ctx.body = deletedUser;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getUser(ctx) {
        try {
            const user = await models_1.User.findByPk(ctx.params.id);
            ctx.body = user;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getUsers(ctx) {
        try {
            ctx.body = await models_1.User.findAll();
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getEnrollmentsByUserId(ctx) {
        const { id } = ctx.params;
        try {
            const enrollments = await models_1.Enrollment.findAll({ where: { userId: id } });
            ctx.body = enrollments;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getFeedbacksByUserId(ctx) {
        const { id } = ctx.params;
        try {
            const feedbacks = await models_1.Feedback.findAll({ where: { userId: id } });
            ctx.body = feedbacks;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getFourmsByUserId(ctx) {
        const { id } = ctx.params;
        try {
            const forums = await models_1.ForumGroup.findAll({ where: { userId: id } });
            ctx.body = forums;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getNotificationsByUserId(ctx) {
        const { id } = ctx.params;
        try {
            const notifications = await models_1.Notification.findAll({
                where: { userId: id },
            });
            ctx.body = notifications;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getActivitiesByUserId(ctx) {
        const { id } = ctx.params;
        try {
            const activities = await models_1.UserActivity.findAll({ where: { userId: id } });
            ctx.body = activities;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = UserController;
