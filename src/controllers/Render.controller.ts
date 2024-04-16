import { Context } from 'koa';

export default function renderer(
  tmp: string,
  data: { [k: string]: string } = {},
) {
  return async (ctx: Context) => {
    await ctx.render(tmp, { ...data, ...ctx.session?.passport });
  };
}
