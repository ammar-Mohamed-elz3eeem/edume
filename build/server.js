"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const koa_1 = __importDefault(require("koa"));
const init_server_1 = __importDefault(require("./utils/init-server"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_passport_1 = __importDefault(require("koa-passport"));
const koa_morgan_1 = __importDefault(require("koa-morgan"));
const koa_pug_1 = __importDefault(require("koa-pug"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_redis_1 = __importDefault(require("koa-redis"));
const User_route_1 = __importDefault(require("./routes/User.route"));
const Course_route_1 = __importDefault(require("./routes/Course.route"));
const Feedback_route_1 = __importDefault(require("./routes/Feedback.route"));
const Answer_route_1 = __importDefault(require("./routes/Answer.route"));
const Forum_route_1 = __importDefault(require("./routes/Forum.route"));
const Group_route_1 = __importDefault(require("./routes/Group.route"));
const Lesson_route_1 = __importDefault(require("./routes/Lesson.route"));
const Notification_route_1 = __importDefault(require("./routes/Notification.route"));
const Auth_route_1 = __importDefault(require("./routes/Auth.route"));
const Enrollments_route_1 = __importDefault(require("./routes/Enrollments.route"));
const koa_body_1 = __importDefault(require("koa-body"));
// import Router from '@koa/router';
// import requireAuth from './middlewares/requireAuth';
// import { Context } from 'koa';
// import Course from './models/Course.model';
// import User from './models/User.model';
// import { ICourse, IUser } from './types';
// const homeRouter = new Router({ prefix: '' });
const app = new koa_1.default();
// app.use(multer({storage: }))
new koa_pug_1.default({
    viewPath: path_1.default.resolve(__dirname, './views'),
    app: app, // Binding `ctx.render()`, equals to pug.use(app)
});
app.use((0, koa_body_1.default)({
    urlencoded: true,
    formidable: {
        uploadDir: path_1.default.resolve(__dirname, '..', 'uploads'),
        keepExtensions: true,
    },
    multipart: true,
}));
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.keys = [process.env.APP_SECRET_KEY || 'secret'];
require('./utils/auth');
app.use((0, koa_morgan_1.default)('dev'));
app.use((0, koa_session_1.default)({
    sameSite: 'strict',
    store: (0, koa_redis_1.default)({
        url: process.env.REDIS_URL,
    }),
}, app));
app.use(koa_passport_1.default.initialize());
app.use(koa_passport_1.default.session());
// User Routes
app.use(User_route_1.default.routes());
app.use(User_route_1.default.allowedMethods());
// Course Routes
app.use(Course_route_1.default.routes());
app.use(Course_route_1.default.allowedMethods());
// Feedback Routes
app.use(Feedback_route_1.default.routes());
app.use(Feedback_route_1.default.allowedMethods());
// Answer Routes
app.use(Answer_route_1.default.routes());
app.use(Answer_route_1.default.allowedMethods());
// Forum Routes
app.use(Forum_route_1.default.routes());
app.use(Forum_route_1.default.allowedMethods());
// Group Routes
app.use(Group_route_1.default.routes());
app.use(Group_route_1.default.allowedMethods());
// Lesson Routes
app.use(Lesson_route_1.default.routes());
app.use(Lesson_route_1.default.allowedMethods());
// Notification Routes
app.use(Notification_route_1.default.routes());
app.use(Notification_route_1.default.allowedMethods());
// Auth Routes
app.use(Auth_route_1.default.routes());
app.use(Auth_route_1.default.allowedMethods());
app.use(Enrollments_route_1.default.routes());
app.use(Enrollments_route_1.default.allowedMethods());
// const router = new Router();
// router.get('/', (ctx: Context) => (ctx.body = 'Welcome to edume'));
// app.use(router.routes());
// app.use(router.allowedMethods());
(0, init_server_1.default)(app);
app.use(async (ctx) => {
    await ctx.throw(404, 'Page not found');
});
exports.default = app;
