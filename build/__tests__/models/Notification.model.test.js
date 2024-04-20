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
describe('Test User Mode', () => {
    let user;
    let notification;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
        user = await index_1.User.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
    });
    it("can't create notification with no userId", async () => {
        const failed = index_2.Notification.create({
            message: 'you enrolled in course #1',
        });
        expect(failed).rejects.toThrow(Error);
    });
    it("can't create notification with invalid userId", async () => {
        const failed = index_2.Notification.create({
            message: 'you enrolled in course #1',
            userId: 99999999999,
        });
        expect(failed).rejects.toThrow(Error);
    });
    it('create notification', async () => {
        notification = await index_2.Notification.create({
            message: 'you enrolled in course #1',
            userId: user.dataValues.id,
        });
        expect(notification.dataValues.id).toBeGreaterThan(0);
    });
    it('update notification', async () => {
        const updated = await index_2.Notification.update({
            message: 'you have completed course successfully',
        }, { where: { id: notification.dataValues.id } });
        expect(updated[0]).toBeGreaterThan(0);
    });
    it('get Notifications from user', async () => {
        const userWithNotifications = await index_1.User.findAll({
            include: [{ model: index_2.Notification, as: 'notifications' }],
        });
        expect(userWithNotifications[0].dataValues.notifications.length).toBeGreaterThan(0);
    });
    it('delete notification', async () => {
        const deleted = await index_2.Notification.destroy({
            where: { id: notification.dataValues.id },
        });
        expect(deleted).toBeGreaterThan(0);
    });
});
