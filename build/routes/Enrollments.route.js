"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Enrollements_controller_1 = __importDefault(require("@/controllers/Enrollements.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router_1 = __importDefault(require("@koa/router"));
const router = new router_1.default({ prefix: '/enrollments' });
router
    .post('/:userId/enroll/:courseId', requireAuth_1.default, Enrollements_controller_1.default.enrollCourse)
    .put('/:userId/finish/:courseId', requireAuth_1.default, Enrollements_controller_1.default.finishCourse);
exports.default = router;
