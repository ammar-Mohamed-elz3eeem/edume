import { Quiz, Question } from '@/models';
import { IQuiz } from '@/types';
import { Context } from 'koa';

export default class QuizController {
  static async addQuiz(ctx: Context) {
    const { title, courseId, questions } = ctx.request.body as IQuiz;
    try {
      const addedQuiz = Quiz.create(
        { title, questions, courseId },
        { include: { model: Question, as: 'questions' } },
      );
      return addedQuiz;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editQuiz(ctx: Context) {
    const { title } = ctx.request.body as IQuiz;
    const { quizId } = ctx.params;
    try {
      const editedQuiz = Quiz.update({ title }, { where: { id: quizId } });
      ctx.body = editedQuiz;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteQuiz(ctx: Context) {
    const { quizId } = ctx.params;
    try {
      const deletedQuiz = Quiz.destroy({ where: { id: quizId } });
      ctx.body = deletedQuiz;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getQuiz(ctx: Context) {
    const { quizId } = ctx.params;
    try {
      const editedQuiz = Quiz.findByPk(quizId);
      ctx.body = editedQuiz;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getQuizes(ctx: Context) {
    try {
      const quizzies = Quiz.findAll();
      ctx.body = quizzies;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
