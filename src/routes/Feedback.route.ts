import FeedbackController from '@/controllers/Feedback.controller';
import requireAuth from '@/middlewares/requireAuth';
import Router from '@koa/router';
// import CourseTag from '@/models/CourseTag.model';

const router = new Router({ prefix: '/feedbacks' });

router
  .post('/', requireAuth, FeedbackController.addFeedback)
  .get('/', FeedbackController.getFeedback)
  .get('/:id', FeedbackController.getFeedback)
  .delete('/:id', requireAuth, FeedbackController.deleteFeedback)
  .put('/:id', requireAuth, FeedbackController.editFeedback);

export default router;
