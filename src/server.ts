import { config } from 'dotenv';
config();
import Koa, { Context } from 'koa';
import initServer from './utils/init-server';
import session from 'koa-session';
import passport from 'koa-passport';
import morgan from 'koa-morgan';
import KoaPug from 'koa-pug';
import path from 'path';
import koaCors from '@koa/cors';
import redisStore from 'koa-redis';
import UserRouter from './routes/User.route';
import CourseRouter from './routes/Course.route';
import FeedbackRouter from './routes/Feedback.route';
import AnswerRouter from './routes/Answer.route';
import ForumRouter from './routes/Forum.route';
import GroupRouter from './routes/Group.route';
import LessonRouter from './routes/Lesson.route';
import NotificationRouter from './routes/Notification.route';
import AuthRouter from './routes/Auth.route';
import EnrollmentRouter from './routes/Enrollments.route';
import koaBody from 'koa-body';

// import Router from '@koa/router';
// import requireAuth from './middlewares/requireAuth';
// import { Context } from 'koa';
// import Course from './models/Course.model';
// import User from './models/User.model';
// import { ICourse, IUser } from './types';

// const homeRouter = new Router({ prefix: '' });

const app = new Koa();
// app.use(multer({storage: }))
new KoaPug({
  viewPath: path.resolve(__dirname, './views'),
  app: app, // Binding `ctx.render()`, equals to pug.use(app)
});

app.use(
  koaBody({
    urlencoded: true,
    formidable: {
      uploadDir: path.resolve(__dirname, '..', 'uploads'),
      keepExtensions: true,
    },
    multipart: true,
  }),
);

app.use(
  koaCors({
    origin: '*',
    credentials: true,
  }),
);
app.keys = [process.env.APP_SECRET_KEY || 'secret'];
require('./utils/auth');
app.use(morgan('dev'));

app.use(
  session(
    {
      sameSite: 'strict',
      store: redisStore({
        url: process.env.REDIS_URL,
      }),
    },
    app,
  ),
);

app.use(passport.initialize());
app.use(passport.session());

// User Routes
app.use(UserRouter.routes());
app.use(UserRouter.allowedMethods());

// Course Routes
app.use(CourseRouter.routes());
app.use(CourseRouter.allowedMethods());

// Feedback Routes
app.use(FeedbackRouter.routes());
app.use(FeedbackRouter.allowedMethods());

// Answer Routes
app.use(AnswerRouter.routes());
app.use(AnswerRouter.allowedMethods());

// Forum Routes
app.use(ForumRouter.routes());
app.use(ForumRouter.allowedMethods());

// Group Routes
app.use(GroupRouter.routes());
app.use(GroupRouter.allowedMethods());

// Lesson Routes
app.use(LessonRouter.routes());
app.use(LessonRouter.allowedMethods());

// Notification Routes
app.use(NotificationRouter.routes());
app.use(NotificationRouter.allowedMethods());

// Auth Routes
app.use(AuthRouter.routes());
app.use(AuthRouter.allowedMethods());

app.use(EnrollmentRouter.routes());
app.use(EnrollmentRouter.allowedMethods());

// const router = new Router();
// router.get('/', (ctx: Context) => (ctx.body = 'Welcome to edume'));
// app.use(router.routes());
// app.use(router.allowedMethods());

initServer(app);

app.use(async (ctx: Context) => {
  await ctx.throw(404, 'Page not found');
});

export default app;
