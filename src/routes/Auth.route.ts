/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthController from '@/controllers/Auth.controller';
import checkSignUp from '@/middlewares/checkSignUp';
import { Context, Next } from 'koa';
import Router from '@koa/router';
import verifyLogin from '@/middlewares/verifyLogin';
import requireAuth from '@/middlewares/requireAuth';

const router = new Router({ prefix: '/auth' });

// .get('/login', renderer('pages/auth/login'))
// .get('/register', renderer('pages/auth/register'))
// .get('/logout', requireAuth, renderer('pages/auth/logout'))
router
  .post('/logout', requireAuth, AuthController.logUserOut)
  .get('/', async (ctx: Context) => {
    console.log('ctx.session', ctx.session);

    if (ctx.isAuthenticated()) {
      ctx.body = ctx.session?.passport.user;
    } else {
      ctx.throw(401, { message: 'unauthorized' });
    }
  })
  .post('/login', verifyLogin)
  .post('/register', checkSignUp);

export default router;
