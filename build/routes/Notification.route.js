"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const Notification_controller_1 = __importDefault(require("../controllers/Notification.controller"));
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router = new router_1.default({ prefix: '/notification' });
router
    .post('/', requireAuth_1.default, Notification_controller_1.default.addNotification)
    .get('/', Notification_controller_1.default.getNotifications)
    .get('/:id', Notification_controller_1.default.getNotification)
    .delete('/:id', requireAuth_1.default, Notification_controller_1.default.deleteNotification)
    .put('/:id', requireAuth_1.default, Notification_controller_1.default.editNotification);
exports.default = router;
