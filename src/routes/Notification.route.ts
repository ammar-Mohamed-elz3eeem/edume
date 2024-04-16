import Router from '@koa/router';
import NotificationController from '@/controllers/Notification.controller';
import requireAuth from '@/middlewares/requireAuth';

const router = new Router({ prefix: '/notification' });

router
  .post('/', requireAuth, NotificationController.addNotification)
  .get('/', NotificationController.getNotifications)
  .get('/:id', NotificationController.getNotification)
  .delete('/:id', requireAuth, NotificationController.deleteNotification)
  .put('/:id', requireAuth, NotificationController.editNotification);

export default router;
