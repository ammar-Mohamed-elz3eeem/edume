import {
  User,
  UserActivity,
  Notification,
  ForumGroup,
  Feedback,
  Enrollment,
} from '@/models';
import { Context } from 'koa';

export default class UserController {
  static async editUser(ctx: Context) {
    try {
      const updatedUser = await User.update(
        ctx.request.body as { [k: string]: string },
        { where: { id: ctx.params.id } },
      );
      ctx.body = updatedUser;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteUser(ctx: Context) {
    try {
      const deletedUser = await User.destroy({ where: { id: ctx.params.id } });
      ctx.body = deletedUser;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getUser(ctx: Context) {
    try {
      const user = await User.findByPk(ctx.params.id);
      ctx.body = user;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getUsers(ctx: Context) {
    try {
      ctx.body = await User.findAll();
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getEnrollmentsByUserId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const enrollments = await Enrollment.findAll({ where: { userId: id } });
      ctx.body = enrollments;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getFeedbacksByUserId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const feedbacks = await Feedback.findAll({ where: { userId: id } });
      ctx.body = feedbacks;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getFourmsByUserId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const forums = await ForumGroup.findAll({ where: { userId: id } });
      ctx.body = forums;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getNotificationsByUserId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const notifications = await Notification.findAll({
        where: { userId: id },
      });
      ctx.body = notifications;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getActivitiesByUserId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const activities = await UserActivity.findAll({ where: { userId: id } });
      ctx.body = activities;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
