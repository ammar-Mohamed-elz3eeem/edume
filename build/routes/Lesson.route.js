"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const Lesson_controller_1 = __importDefault(require("@/controllers/Lesson.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router = new router_1.default({ prefix: '/lessons' });
router
    .post('/', requireAuth_1.default, Lesson_controller_1.default.addLesson)
    .get('/', Lesson_controller_1.default.getLessons)
    .delete('/:id', requireAuth_1.default, Lesson_controller_1.default.deleteLesson)
    .put('/:id', requireAuth_1.default, Lesson_controller_1.default.editLesson)
    .get('/:id', Lesson_controller_1.default.getLesson);
exports.default = router;
