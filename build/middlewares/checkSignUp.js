"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_passport_1 = __importDefault(require("koa-passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("@/models/User.model"));
async function checkSignUp(ctx, next) {
    const { username, password, firstName, lastName, email, confirm_password, dob, avatarUrl, role, } = ctx.request.body;
    console.log('REQUEST BODY:', ctx.request.body);
    if (!username || !password || !firstName || !password || !email || !dob) {
        ctx.throw(400, 'all fields are required');
    }
    if (password !== confirm_password) {
        ctx.throw(400, 'password & confirm password must be identical');
    }
    try {
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password + process.env.PASSWORD_SALT, salt);
        const newUser = await User_model_1.default.create({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            dob,
            avatarUrl,
            role,
        });
        return koa_passport_1.default.authenticate('local', async (err, user, info, status) => {
            if (user) {
                await ctx.login(user);
                ctx.method = 'GET';
                ctx.body = user;
            }
            else {
                ctx.status = 400;
                ctx.body = { status: 'error' };
            }
        })(ctx, next);
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, error.message);
    }
}
exports.default = checkSignUp;
