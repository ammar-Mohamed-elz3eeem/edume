"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class NotificationController {
    static async addNotification(ctx) {
        const { message, read, userId } = ctx.request.body;
        try {
            const addedNotification = await models_1.Notification.create({
                message,
                read,
                userId,
            });
            ctx.body = addedNotification;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editNotification(ctx) {
        const { read } = ctx.request.body;
        const { id } = ctx.params;
        try {
            const editedNotification = await models_1.Notification.update({
                read,
            }, { where: { id } });
            ctx.body = editedNotification;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteNotification(ctx) {
        const { id } = ctx.params;
        try {
            const deletedNotification = await models_1.Notification.destroy({ where: { id } });
            ctx.body = deletedNotification;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getNotification(ctx) {
        const { id } = ctx.params;
        try {
            const foundNotification = await models_1.Notification.findByPk(id);
            ctx.body = foundNotification;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getNotifications(ctx) {
        try {
            const foundNotifications = await models_1.Notification.findAll();
            ctx.body = foundNotifications;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = NotificationController;
