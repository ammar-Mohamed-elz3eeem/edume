"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class GroupController {
    static async addGroup(ctx) {
        const { createdBy, name, courseId } = ctx.request.body;
        try {
            const addedGroup = await models_1.Group.create({ createdBy, name, courseId });
            ctx.body = addedGroup;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async editGroup(ctx) {
        const { name } = ctx.request.body;
        const { groupId } = ctx.params;
        try {
            const editedGroup = await models_1.Group.update({ name }, { where: { id: groupId } });
            ctx.body = editedGroup;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteGroup(ctx) {
        const { groupId } = ctx.params;
        try {
            const deletedGroup = await models_1.Group.destroy({ where: { id: groupId } });
            ctx.body = deletedGroup;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getGroup(ctx) {
        const { groupId } = ctx.params;
        try {
            const foundGroup = await models_1.Group.findByPk(groupId);
            ctx.body = foundGroup;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getGroups(ctx) {
        try {
            const foundGroups = await models_1.Group.findAll();
            ctx.body = foundGroups;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = GroupController;
