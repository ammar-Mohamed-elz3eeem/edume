"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Feedback_controller_1 = __importDefault(require("@/controllers/Feedback.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router_1 = __importDefault(require("@koa/router"));
// import CourseTag from '@/models/CourseTag.model';
const router = new router_1.default({ prefix: '/feedbacks' });
router
    .post('/', requireAuth_1.default, Feedback_controller_1.default.addFeedback)
    .get('/', Feedback_controller_1.default.getFeedback)
    .get('/:id', Feedback_controller_1.default.getFeedback)
    .delete('/:id', requireAuth_1.default, Feedback_controller_1.default.deleteFeedback)
    .put('/:id', requireAuth_1.default, Feedback_controller_1.default.editFeedback);
exports.default = router;
