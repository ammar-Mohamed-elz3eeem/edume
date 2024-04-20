"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Forum_controller_1 = __importDefault(require("@/controllers/Forum.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router_1 = __importDefault(require("@koa/router"));
const router = new router_1.default({ prefix: '/forums' });
router
    .post('/', requireAuth_1.default, Forum_controller_1.default.addForum)
    .get('/', Forum_controller_1.default.getForums)
    .get('/:id', Forum_controller_1.default.getForum)
    .put('/:id', requireAuth_1.default, Forum_controller_1.default.editForum)
    .delete('/:id', requireAuth_1.default, Forum_controller_1.default.deleteForum);
exports.default = router;
