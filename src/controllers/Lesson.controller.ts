import { Lesson } from '@/models';
import { ILesson } from '@/types';
import { Context } from 'koa';

export default class LessonController {
  static async addLesson(ctx: Context) {
    try {
      const { title, content, courseId } = ctx.request.body as ILesson;
      const newLesson = await Lesson.create({ title, content, courseId });
      ctx.body = newLesson;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editLesson(ctx: Context) {
    try {
      const { title, content } = ctx.request.body as ILesson;
      const { lessonId } = ctx.params;
      const editedLesson = await Lesson.update(
        { title, content },
        { where: { id: lessonId } },
      );
      ctx.body = editedLesson;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteLesson(ctx: Context) {
    try {
      const { lessonId } = ctx.params;
      const deletedLesson = await Lesson.destroy({ where: { id: lessonId } });
      ctx.body = deletedLesson;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getLesson(ctx: Context) {
    try {
      const { lessonId } = ctx.params;
      const foundLesson = await Lesson.findOne({ where: { id: lessonId } });
      ctx.body = foundLesson;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getLessons(ctx: Context) {
    try {
      const foundLessons = await Lesson.findAll();
      ctx.body = foundLessons;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
