import Router from '@koa/router';
import CourseProgressController from '@/controllers/CourseProgress.controller';
import requireAuth from '@/middlewares/requireAuth';

const router = new Router({ prefix: '/course-progress' });

router
  .get('/', CourseProgressController.getCourseProgresses)
  .post('/', requireAuth, CourseProgressController.addCourseProgress)
  .delete(
    'course/:courseId',
    requireAuth,
    CourseProgressController.addCourseProgress,
  )
  .put(
    '/course/:courseId/lesson/:lessonId/user/:userId',
    requireAuth,
    CourseProgressController.editCourseProgress,
  )
  .get(
    '/course/:courseId/lesson/:lessonId/user/:userId',
    requireAuth,
    CourseProgressController.getCourseProgress,
  );
