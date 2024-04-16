import EnrollmentController from '@/controllers/Enrollements.controller';
import requireAuth from '@/middlewares/requireAuth';
import Router from '@koa/router';
const router = new Router({ prefix: '/enrollments' });

router
  .post(
    '/:userId/enroll/:courseId',
    requireAuth,
    EnrollmentController.enrollCourse,
  )
  .put(
    '/:userId/finish/:courseId',
    requireAuth,
    EnrollmentController.finishCourse,
  );

export default router;
