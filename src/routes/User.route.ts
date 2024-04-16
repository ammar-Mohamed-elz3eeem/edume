import UserController from '@/controllers/User.controller';
import requireAuth from '@/middlewares/requireAuth';
import Router from '@koa/router';

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', requireAuth, UserController.getUser)
  .get('/:id/enrollments', requireAuth, UserController.getEnrollmentsByUserId)
  .get('/:id/feedbacks', requireAuth, UserController.getFeedbacksByUserId)
  .get('/:id/forums', requireAuth, UserController.getFourmsByUserId)
  .get(
    '/:id/notifications',
    requireAuth,
    UserController.getNotificationsByUserId,
  )
  .get('/:id/actvities', requireAuth, UserController.getActivitiesByUserId)
  .get('/', UserController.getUsers)
  .put('/:id', requireAuth, UserController.editUser)
  .delete('/:id', requireAuth, UserController.deleteUser);

export default router;
