"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_passport_1 = __importDefault(require("koa-passport"));
const User_model_1 = __importDefault(require("../models/User.model"));
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const options = {};
koa_passport_1.default.serializeUser((user, done) => {
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
koa_passport_1.default.deserializeUser(async (user, done) => {
    try {
        const foundUser = await User_model_1.default.findByPk(user.id);
        done(null, foundUser?.dataValues);
    }
    catch (error) {
        done(error, null);
    }
});
koa_passport_1.default.use('local', new passport_local_1.Strategy(options, async (username, password, done) => {
    const user = await User_model_1.default.findOne({ where: { username } });
    if (!user) {
        return done(null, false);
    }
    if (bcrypt_1.default.compareSync(password + process.env.PASSWORD_SALT, user.dataValues.password)) {
        return done(null, user.dataValues);
    }
    return done(null, false);
}));
