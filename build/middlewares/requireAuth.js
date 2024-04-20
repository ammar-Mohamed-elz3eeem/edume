"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function requireAuth(ctx, next) {
    if (ctx.session && ctx.session?.passport && ctx.session.passport.user) {
        return await next();
    }
    else {
        return ctx.throw(401, 'unauthorized');
    }
}
exports.default = requireAuth;
