import Router from '@koa/router';
import LessonController from '@/controllers/Lesson.controller';
import requireAuth from '@/middlewares/requireAuth';

const router = new Router({ prefix: '/lessons' });

router
  .post('/', requireAuth, LessonController.addLesson)
  .get('/', LessonController.getLessons)
  .delete('/:id', requireAuth, LessonController.deleteLesson)
  .put('/:id', requireAuth, LessonController.editLesson)
  .get('/:id', LessonController.getLesson);

export default router;
