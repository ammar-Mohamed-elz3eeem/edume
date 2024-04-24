/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context, Next } from 'koa';
import passport from 'koa-passport';
import bcrypt from 'bcrypt';
import User from '@/models/User.model';
import { IUser } from '@/types';

export default async function checkSignUp(ctx: Context, next: Next) {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    confirm_password,
    dob,
    avatarUrl,
    role,
  } = ctx.request.body as IUser;
  console.log('REQUEST BODY:', ctx.request.body);
  if (!username || !password || !firstName || !password || !email || !dob) {
    ctx.throw(400, 'all fields are required');
  }
  if (password !== confirm_password) {
    ctx.throw(400, 'password & confirm password must be identical');
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      password + process.env.PASSWORD_SALT,
      salt,
    );
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      dob,
      avatarUrl,
      role,
    });
    return passport.authenticate('local', async (err, user, info, status) => {
      if (user) {
        await ctx.login(user);
        ctx.body = user;
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx, next);
  } catch (error) {
    console.log(error);
    ctx.throw(500, (error as Error).message);
  }
}
