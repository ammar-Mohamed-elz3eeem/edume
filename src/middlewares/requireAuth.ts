import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';

interface UploadContext extends Context {}

export default async function requireAuth(
  ctx: UploadContext,
  next: Next,
): Promise<IMiddleware> {
  if (ctx.session && ctx.session?.passport && ctx.session.passport.user) {
    return await next();
  } else {
    return ctx.throw(401, 'unauthorized');
  }
}
