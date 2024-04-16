import { Group } from '@/models';
import { IGroup } from '@/types';
import { Context } from 'koa';

export default class GroupController {
  static async addGroup(ctx: Context) {
    const { createdBy, name, courseId } = ctx.request.body as IGroup;
    try {
      const addedGroup = await Group.create({ createdBy, name, courseId });
      ctx.body = addedGroup;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editGroup(ctx: Context) {
    const { name } = ctx.request.body as IGroup;
    const { groupId } = ctx.params;

    try {
      const editedGroup = await Group.update(
        { name },
        { where: { id: groupId } },
      );
      ctx.body = editedGroup;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteGroup(ctx: Context) {
    const { groupId } = ctx.params;
    try {
      const deletedGroup = await Group.destroy({ where: { id: groupId } });
      ctx.body = deletedGroup;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getGroup(ctx: Context) {
    const { groupId } = ctx.params;
    try {
      const foundGroup = await Group.findByPk(groupId);
      ctx.body = foundGroup;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getGroups(ctx: Context) {
    try {
      const foundGroups = await Group.findAll();
      ctx.body = foundGroups;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
