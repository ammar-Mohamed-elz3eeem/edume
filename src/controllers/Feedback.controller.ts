import { Feedback } from '@/models';
import { IFeedback } from '@/types';
import { Context } from 'koa';

export default class FeedbackController {
  static async addFeedback(ctx: Context) {
    try {
      const { userId, courseId, comment, rating } = ctx.request
        .body as IFeedback;
      const feedback = Feedback.create({ userId, comment, rating, courseId });
      ctx.body = feedback;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editFeedback(ctx: Context) {
    try {
      const { userId, comment, rating } = ctx.request.body as IFeedback;
      const feedbackId = ctx.params.id;
      const isUpdated = Feedback.update(
        { userId, comment, rating },
        { where: { id: feedbackId } },
      );
      ctx.body = isUpdated;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteFeedback(ctx: Context) {
    try {
      const feedbackId = ctx.params.id;
      const isDeleted = Feedback.destroy({ where: { id: feedbackId } });
      ctx.body = isDeleted;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getFeedback(ctx: Context) {
    try {
      const feedbackId = ctx.params.id;
      const foundFeedback = Feedback.findByPk(feedbackId);
      ctx.body = foundFeedback;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getFeedbacks(ctx: Context) {
    try {
      const foundFeedbacks = Feedback.findAll();
      ctx.body = foundFeedbacks;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
