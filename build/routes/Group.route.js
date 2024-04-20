"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Group_controller_1 = __importDefault(require("@/controllers/Group.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router_1 = __importDefault(require("@koa/router"));
const router = new router_1.default({ prefix: '/groups' });
router
    .post('/', requireAuth_1.default, Group_controller_1.default.addGroup)
    .get('/', Group_controller_1.default.getGroups)
    .get('/:id', Group_controller_1.default.getGroup)
    .put('/:id', requireAuth_1.default, Group_controller_1.default.editGroup)
    .delete('/:id', requireAuth_1.default, Group_controller_1.default.deleteGroup);
exports.default = router;
