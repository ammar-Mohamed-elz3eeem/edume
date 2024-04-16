import CourseController from '@/controllers/Course.controller';
import requireAuth from '@/middlewares/requireAuth';
import Router from 'koa-router';
// import CourseTag from '@/models/CourseTag.model';

const router = new Router({ prefix: '/courses' });

router
  .delete('/:id', requireAuth, CourseController.deleteCourses)
  .put('/:id', requireAuth, CourseController.editCourse)
  .post('/', requireAuth, CourseController.addCourse)
  .get('/:id/lessons', CourseController.getLessonsByCourseId)
  .get('/:id/quizzies', CourseController.getQuizziesByCourseId)
  .get('/:id/enrollments', CourseController.getCourseEnrollmentsByCourseId)
  .get('/:id/feedbacks', CourseController.getFeedbacksForCourseId)
  .get('/:id/groups', CourseController.getGroupsByCourseId)
  .get('/:id/resources', CourseController.getResourcesByCourseId)
  .get('/', CourseController.getCourses)
  .get('/:id', CourseController.getCourse);

export default router;
