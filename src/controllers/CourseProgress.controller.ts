import { Course, CourseProgress } from '@/models';
import { ICourseProgress } from '@/types';
import { Context } from 'koa';
export default class CourseProgressController {
  static async addCourseProgress(ctx: Context) {
    const {
      userId,
      courseId,
      lessonId,
      completed,
      progressPercentage,
      lastAccessedAt,
    } = ctx.request.body as ICourseProgress;
    try {
      const progress = await CourseProgress.create({
        userId,
        courseId,
        lessonId,
        completed,
        progressPercentage,
        lastAccessedAt,
      });
      ctx.body = progress;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async editCourseProgress(ctx: Context) {
    const { completed, progressPercentage, lastAccessedAt } = ctx.request
      .body as ICourseProgress;
    const { userId, courseId, lessonId } = ctx.params;
    try {
      const updatedCourseProgress = CourseProgress.update(
        {
          completed,
          progressPercentage,
          lastAccessedAt,
        },
        { where: { userId, courseId, lessonId } },
      );
      ctx.body = updatedCourseProgress;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteCourseProgress(ctx: Context) {
    const { courseId } = ctx.params;
    try {
      const deletedProgress = await Course.destroy({
        where: { courseId },
      });
      ctx.body = deletedProgress;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getCourseProgress(ctx: Context) {
    const { userId, courseId, lessonId } = ctx.params;
    try {
      const foundProgress = await CourseProgress.findOne({
        where: { userId, courseId, lessonId },
      });
      ctx.body = foundProgress;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getCourseProgresses(ctx: Context) {
    try {
      const foundProgresses = await CourseProgress.findAll();
      ctx.body = foundProgresses;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
