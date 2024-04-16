import { Answer } from '@/models/index';
import { IAnswer } from '@/types';
import { Context } from 'koa';

export default class AnswerController {
  static async addAnswer(ctx: Context) {
    const { content, isCorrect, questionId } = ctx.request.body as IAnswer;
    try {
      const addedAnswer = Answer.create({ content, isCorrect, questionId });
      ctx.body = addedAnswer;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editAnswer(ctx: Context) {
    const { id } = ctx.params;
    const { content, isCorrect } = ctx.request.body as IAnswer;
    try {
      const editedAnswer = Answer.update(
        { content, isCorrect },
        { where: { id: id } },
      );
      ctx.body = editedAnswer;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteAnswer(ctx: Context) {
    const { id } = ctx.params;
    try {
      const deletedAnswer = Answer.destroy({ where: { id: id } });
      ctx.body = deletedAnswer;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getAnswer(ctx: Context) {
    const { id } = ctx.params;
    try {
      const answer = await Answer.findByPk(id);
      ctx.body = answer;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getAnswers(ctx: Context) {
    try {
      const answer = await Answer.findAll();
      ctx.body = answer;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
