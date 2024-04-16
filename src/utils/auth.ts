import passport from 'koa-passport';
import User from '../models/User.model';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { IUser } from '@/types';

const options = {};

passport.serializeUser((user: Express.User, done) => {
  done(null, {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: user.avatarUrl,
    role: user.role,
    dob: user.dob,
  });
});

passport.deserializeUser(async (user: IUser, done) => {
  try {
    const foundUser = await User.findByPk(user.id);
    done(null, foundUser?.dataValues);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  'local',
  new LocalStrategy(
    options,
    async (username: string, password: string, done) => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false);
      }
      if (
        bcrypt.compareSync(
          password + process.env.PASSWORD_SALT,
          user.dataValues.password,
        )
      ) {
        return done(null, user.dataValues);
      }
      return done(null, false);
    },
  ),
);
