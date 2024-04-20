"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const koa_1 = __importDefault(require("koa"));
const cors_1 = __importDefault(require("@koa/cors"));
const app = new koa_1.default();
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use((ctx) => {
    ctx.body = 'Hello From edume';
});
app.listen(9000, () => {
    console.log('listening to server on port 9000');
});
