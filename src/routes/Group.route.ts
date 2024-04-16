import GroupController from '@/controllers/Group.controller';
import requireAuth from '@/middlewares/requireAuth';
import Router from '@koa/router';

const router = new Router({ prefix: '/groups' });

router
  .post('/', requireAuth, GroupController.addGroup)
  .get('/', GroupController.getGroups)
  .get('/:id', GroupController.getGroup)
  .put('/:id', requireAuth, GroupController.editGroup)
  .delete('/:id', requireAuth, GroupController.deleteGroup);

export default router;
