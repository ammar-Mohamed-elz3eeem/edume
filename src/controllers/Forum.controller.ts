import { ForumGroup } from '@/models';
import { IForum } from '@/types';
import { Context } from 'koa';

export default class ForumController {
  static async addForum(ctx: Context) {
    const { userId, content } = ctx.request.body as IForum;
    try {
      const addedForum = await ForumGroup.create({ userId, content });
      ctx.body = addedForum;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editForum(ctx: Context) {
    const { content } = ctx.request.body as IForum;
    const { id } = ctx.params;

    try {
      const editedForum = await ForumGroup.update(
        { content },
        { where: { id } },
      );
      ctx.body = editedForum;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteForum(ctx: Context) {
    const { id } = ctx.params;
    try {
      const deletedForum = await ForumGroup.destroy({ where: { id } });
      ctx.body = deletedForum;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getForum(ctx: Context) {
    const { id } = ctx.params;
    try {
      const foundForum = await ForumGroup.findByPk(id);
      ctx.body = foundForum;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getForums(ctx: Context) {
    try {
      const foundForums = await ForumGroup.findAll();
      ctx.body = foundForums;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
