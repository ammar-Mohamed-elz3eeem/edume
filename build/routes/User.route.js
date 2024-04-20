"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router_1 = __importDefault(require("@koa/router"));
const router = new router_1.default({
    prefix: '/users',
});
router
    .get('/:id', requireAuth_1.default, User_controller_1.default.getUser)
    .get('/:id/enrollments', requireAuth_1.default, User_controller_1.default.getEnrollmentsByUserId)
    .get('/:id/feedbacks', requireAuth_1.default, User_controller_1.default.getFeedbacksByUserId)
    .get('/:id/forums', requireAuth_1.default, User_controller_1.default.getFourmsByUserId)
    .get('/:id/notifications', requireAuth_1.default, User_controller_1.default.getNotificationsByUserId)
    .get('/:id/actvities', requireAuth_1.default, User_controller_1.default.getActivitiesByUserId)
    .get('/', User_controller_1.default.getUsers)
    .put('/:id', requireAuth_1.default, User_controller_1.default.editUser)
    .delete('/:id', requireAuth_1.default, User_controller_1.default.deleteUser);
exports.default = router;
