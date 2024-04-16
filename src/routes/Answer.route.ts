import Router from '@koa/router';
import AnswerController from '@/controllers/Answer.controller';
import requireAuth from '@/middlewares/requireAuth';

const router = new Router({ prefix: '/answers' });

router
  .post('/', requireAuth, AnswerController.addAnswer)
  .get('/', AnswerController.getAnswers)
  .delete('/:id', requireAuth, AnswerController.deleteAnswer)
  .put('/:id', requireAuth, AnswerController.editAnswer)
  .get('/:id', AnswerController.getAnswer);

export default router;
