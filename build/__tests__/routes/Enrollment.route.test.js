"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const test_setup_1 = __importDefault(require("../../test_setup"));
const db_1 = __importDefault(require("@/db"));
const seeds_1 = require("@/utils/seeds");
let api;
let server;
let agent;
describe('Test Course Routes', () => {
    beforeAll(async () => {
        server = test_setup_1.default.listen(9000);
        agent = supertest_1.default.agent(server);
        api = (0, supertest_1.default)(server);
        await db_1.default.sync({ force: true });
        await Promise.all(seeds_1.users.map(async (user) => await agent.post('/auth/register').send(user)));
        await Promise.all(seeds_1.courses.map(async (course) => await agent.post('/courses').send(course)));
    });
    afterAll(async () => {
        server.close();
    });
    it('POST /enrollments/1/enroll/1 with unautherized user', async () => {
        const response = await api.post('/enrollments/1/enroll/1');
        expect(response.text).toBe('unauthorized');
        expect(response.status).toBe(401);
    });
    it('POST /enrollments/1/enroll/1 with auth user', async () => {
        const response = await agent.post('/enrollments/1/enroll/1');
        await agent.post('/enrollments/1/enroll/2');
        await agent.post('/enrollments/1/enroll/3');
        await agent.post('/enrollments/2/enroll/3');
        await agent.post('/enrollments/3/enroll/3');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('enrollment_date');
        expect(response.body).toHaveProperty('completion_date');
        expect(response.body.completion_date).toBe(null);
    });
    it('GET /courses/1/enrollments', async () => {
        const response = await agent.get('/courses/3/enrollments');
        expect(response.body.length).toBe(3);
    });
});
