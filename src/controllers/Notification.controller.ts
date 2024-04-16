import { Notification } from '@/models';
import { INtofication } from '@/types';
import { Context } from 'koa';

export default class NotificationController {
  static async addNotification(ctx: Context) {
    const { message, read, userId } = ctx.request.body as INtofication;
    try {
      const addedNotification = await Notification.create({
        message,
        read,
        userId,
      });
      ctx.body = addedNotification;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editNotification(ctx: Context) {
    const { read } = ctx.request.body as INtofication;
    const { id } = ctx.params;
    try {
      const editedNotification = await Notification.update(
        {
          read,
        },
        { where: { id } },
      );
      ctx.body = editedNotification;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteNotification(ctx: Context) {
    const { id } = ctx.params;
    try {
      const deletedNotification = await Notification.destroy({ where: { id } });
      ctx.body = deletedNotification;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getNotification(ctx: Context) {
    const { id } = ctx.params;
    try {
      const foundNotification = await Notification.findByPk(id);
      ctx.body = foundNotification;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getNotifications(ctx: Context) {
    try {
      const foundNotifications = await Notification.findAll();
      ctx.body = foundNotifications;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
