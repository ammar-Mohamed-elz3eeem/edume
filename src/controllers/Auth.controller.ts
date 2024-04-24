/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Next } from 'koa';
import passport from 'koa-passport';

export default class AuthController {
  static async logUserOut(ctx: Context, next: Next) {
    await ctx.logout();
    ctx.redirect('/auth');
  }
}
