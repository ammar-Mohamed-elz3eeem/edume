"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_passport_1 = __importDefault(require("koa-passport"));
async function verifyLogin(ctx, next) {
    return await koa_passport_1.default.authenticate('local', async (err, user, info, status) => {
        if (user) {
            await ctx.login(user);
            ctx.method = 'GET';
            ctx.body = user;
            await next();
        }
        else {
            ctx.status = 400;
            ctx.body = { status: 'Invalid credentials' };
        }
    })(ctx, next);
}
exports.default = verifyLogin;
