"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const CourseProgress_controller_1 = __importDefault(require("@/controllers/CourseProgress.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router = new router_1.default({ prefix: '/course-progress' });
router
    .get('/', CourseProgress_controller_1.default.getCourseProgresses)
    .post('/', requireAuth_1.default, CourseProgress_controller_1.default.addCourseProgress)
    .delete('course/:courseId', requireAuth_1.default, CourseProgress_controller_1.default.addCourseProgress)
    .put('/course/:courseId/lesson/:lessonId/user/:userId', requireAuth_1.default, CourseProgress_controller_1.default.editCourseProgress)
    .get('/course/:courseId/lesson/:lessonId/user/:userId', requireAuth_1.default, CourseProgress_controller_1.default.getCourseProgress);
