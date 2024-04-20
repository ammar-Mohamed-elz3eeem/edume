"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    static async logUserOut(ctx, next) {
        await ctx.logout();
        ctx.response.redirect('/auth');
        await next();
    }
}
exports.default = AuthController;
