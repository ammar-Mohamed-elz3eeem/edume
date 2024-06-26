/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Next } from 'koa';
import passport from 'koa-passport';

export default async function verifyLogin(ctx: Context, next: Next) {
  return await passport.authenticate(
    'local',
    async (err, user, info, status) => {
      if (user) {
        await ctx.login(user);
        ctx.body = user;
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    },
  )(ctx, next);
}
