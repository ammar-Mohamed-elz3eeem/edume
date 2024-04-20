"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const Auth_controller_1 = __importDefault(require("../controllers/Auth.controller"));
const checkSignUp_1 = __importDefault(require("../middlewares/checkSignUp"));
const router_1 = __importDefault(require("@koa/router"));
const verifyLogin_1 = __importDefault(require("../middlewares/verifyLogin"));
const requireAuth_1 = __importDefault(require("../middlewares/requireAuth"));
const router = new router_1.default({ prefix: '/auth' });
// .get('/login', renderer('pages/auth/login'))
// .get('/register', renderer('pages/auth/register'))
// .get('/logout', requireAuth, renderer('pages/auth/logout'))
router
    .post('/logout', requireAuth_1.default, Auth_controller_1.default.logUserOut)
    .get('/', async (ctx) => {
    console.log('ctx.session', ctx.session);
    if (ctx.isAuthenticated()) {
        ctx.body = ctx.session?.passport.user;
    }
    else {
        ctx.throw(401, { message: 'unauthorized' });
    }
})
    .post('/login', verifyLogin_1.default)
    .post('/register', checkSignUp_1.default);
exports.default = router;
