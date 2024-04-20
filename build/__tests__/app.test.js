"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("@/server"));
test('Hello world works', async () => {
    const response = await (0, supertest_1.default)(server_1.default.callback()).get('/');
    // console.log(response);
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to edume');
});
