"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const User_model_1 = __importDefault(require("../../models/User.model"));
const db_1 = __importDefault(require("../../db"));
const index_1 = require("../../models/index");
describe('Test User Mode', () => {
    let user;
    let forum;
    beforeAll(async () => {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: true });
        user = await User_model_1.default.create({
            firstName: 'ammar',
            lastName: 'Massoud',
            username: 'ammar-koa',
            email: 'ammar@gmail.com',
            password: '158269347',
        });
    });
    it("no user id can't add Forum", async () => {
        const invalidForum = index_1.ForumGroup.create({
            content: 'This is #1 Forum',
        });
        expect(invalidForum).rejects.toThrow(Error);
    });
    it("invalid user id can't add Forum", async () => {
        const invalidForum = index_1.ForumGroup.create({
            content: 'This is #1 Forum',
            userId: 999999999999,
        });
        expect(invalidForum).rejects.toThrow(Error);
    });
    it('add new Forum', async () => {
        forum = await index_1.ForumGroup.create({
            content: 'This is #1 Forum',
            userId: user.dataValues.id,
        });
        expect(forum.dataValues.id).toBeGreaterThan(0);
    });
    it('edit Forum', async () => {
        const editedForum = await index_1.ForumGroup.update({
            content: '#1 Content edited',
        }, { where: { id: forum.dataValues.id } });
        expect(editedForum[0]).toBeGreaterThan(0);
    });
    it('get all forums', async () => {
        const forums = await index_1.ForumGroup.findAll();
        expect(forums.length).toBeGreaterThan(0);
    });
    it('delete new Forum', async () => {
        const deletedForum = await index_1.ForumGroup.destroy({
            where: { id: user.dataValues.id },
        });
        expect(deletedForum).toBeGreaterThan(0);
    });
});
