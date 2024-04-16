import { Enrollment } from '@/models';
import { Context } from 'koa';

export default class EnrollmentController {
  static async enrollCourse(ctx: Context) {
    const { userId, courseId } = ctx.params;
    try {
      const enrolled = await Enrollment.create({ userId, courseId });
      ctx.body = enrolled;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async finishCourse(ctx: Context) {
    const { userId, courseId } = ctx.params;
    try {
      const finished = Enrollment.update(
        { completion_date: new Date() },
        { where: { courseId, userId } },
      );
      ctx.body = finished;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
