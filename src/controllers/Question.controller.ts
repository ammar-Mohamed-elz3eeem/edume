import { Question, Answer } from '@/models';
import { IQuestion } from '@/types';
import { Context } from 'koa';

export default class QuestionsController {
  static async addQuestion(ctx: Context) {
    const { title, quizId, answers } = ctx.request.body as IQuestion;
    try {
      const addedQuestion = Question.create(
        { title, quizId, answers },
        { include: { model: Answer, as: 'answers' } },
      );
      return addedQuestion;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editQuestion(ctx: Context) {
    const { title } = ctx.request.body as IQuestion;
    const { questionId } = ctx.params;
    try {
      const editedQuuestion = Question.update(
        { title },
        { where: { id: questionId } },
      );
      ctx.body = editedQuuestion;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteQuiz(ctx: Context) {
    const { questionId } = ctx.params;
    try {
      const deletedQuestion = Question.destroy({ where: { id: questionId } });
      ctx.body = deletedQuestion;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getQuiz(ctx: Context) {
    const { questionId } = ctx.params;
    try {
      const editedQuiz = Question.findByPk(questionId);
      ctx.body = editedQuiz;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getQuestions(ctx: Context) {
    try {
      const questions = Question.findAll();
      ctx.body = questions;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
