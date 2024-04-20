"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class ForumController {
    static async addForum(ctx) {
        const { userId, content } = ctx.request.body;
        try {
            const addedForum = await models_1.ForumGroup.create({ userId, content });
            ctx.body = addedForum;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editForum(ctx) {
        const { content } = ctx.request.body;
        const { id } = ctx.params;
        try {
            const editedForum = await models_1.ForumGroup.update({ content }, { where: { id } });
            ctx.body = editedForum;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteForum(ctx) {
        const { id } = ctx.params;
        try {
            const deletedForum = await models_1.ForumGroup.destroy({ where: { id } });
            ctx.body = deletedForum;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getForum(ctx) {
        const { id } = ctx.params;
        try {
            const foundForum = await models_1.ForumGroup.findByPk(id);
            ctx.body = foundForum;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getForums(ctx) {
        try {
            const foundForums = await models_1.ForumGroup.findAll();
            ctx.body = foundForums;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = ForumController;
