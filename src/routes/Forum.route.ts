import ForumController from '@/controllers/Forum.controller';
import requireAuth from '@/middlewares/requireAuth';
import Router from '@koa/router';

const router = new Router({ prefix: '/forums' });

router
  .post('/', requireAuth, ForumController.addForum)
  .get('/', ForumController.getForums)
  .get('/:id', ForumController.getForum)
  .put('/:id', requireAuth, ForumController.editForum)
  .delete('/:id', requireAuth, ForumController.deleteForum);

export default router;
