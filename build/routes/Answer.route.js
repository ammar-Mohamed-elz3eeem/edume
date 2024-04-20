"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const Answer_controller_1 = __importDefault(require("@/controllers/Answer.controller"));
const requireAuth_1 = __importDefault(require("@/middlewares/requireAuth"));
const router = new router_1.default({ prefix: '/answers' });
router
    .post('/', requireAuth_1.default, Answer_controller_1.default.addAnswer)
    .get('/', Answer_controller_1.default.getAnswers)
    .delete('/:id', requireAuth_1.default, Answer_controller_1.default.deleteAnswer)
    .put('/:id', requireAuth_1.default, Answer_controller_1.default.editAnswer)
    .get('/:id', Answer_controller_1.default.getAnswer);
exports.default = router;
