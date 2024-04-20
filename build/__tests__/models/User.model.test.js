"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_1 = __importDefault(require("../../db"));
const index_1 = require("../../models/index");
describe('Test User Mode', () => {
    let user;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
    });
    afterAll(async () => {
        await db_1.default.close();
    });
    it('test add user', async () => {
        user = await index_1.User.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
        expect(user.dataValues.id).toBeGreaterThan(0);
    });
    it('test update user', async () => {
        const updatedUser = await index_1.User.update({
            username: 'ammar-jest',
        }, {
            where: { id: user.dataValues.id },
        });
        expect(updatedUser[0]).toBeGreaterThan(0);
    });
    it('test get user', async () => {
        const foundUser = await index_1.User.findOne({
            where: { username: 'ammar-jest' },
        });
        expect(foundUser?.dataValues.id).toBe(user.dataValues.id);
    });
    it('test delete user', async () => {
        const deletedUser = await index_1.User.destroy({
            where: { id: user.dataValues.id },
        });
        expect(deletedUser).toBeGreaterThan(0);
    });
});
