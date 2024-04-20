"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_controller_1 = __importDefault(require("@/controllers/Course.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const koa_router_1 = __importDefault(require("koa-router"));
// import CourseTag from '@/models/CourseTag.model';
const router = new koa_router_1.default({ prefix: '/courses' });
router
    .delete('/:id', requireAuth_1.default, Course_controller_1.default.deleteCourses)
    .put('/:id', requireAuth_1.default, Course_controller_1.default.editCourse)
    .post('/', requireAuth_1.default, Course_controller_1.default.addCourse)
    .get('/:id/lessons', Course_controller_1.default.getLessonsByCourseId)
    .get('/:id/quizzies', Course_controller_1.default.getQuizziesByCourseId)
    .get('/:id/enrollments', Course_controller_1.default.getCourseEnrollmentsByCourseId)
    .get('/:id/feedbacks', Course_controller_1.default.getFeedbacksForCourseId)
    .get('/:id/groups', Course_controller_1.default.getGroupsByCourseId)
    .get('/:id/resources', Course_controller_1.default.getResourcesByCourseId)
    .get('/', Course_controller_1.default.getCourses)
    .get('/:id', Course_controller_1.default.getCourse);
exports.default = router;
