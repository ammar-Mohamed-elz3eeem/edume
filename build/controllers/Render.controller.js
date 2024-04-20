"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function renderer(tmp, data = {}) {
    return async (ctx) => {
        await ctx.render(tmp, { ...data, ...ctx.session?.passport });
    };
}
exports.default = renderer;
