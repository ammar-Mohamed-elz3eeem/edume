"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const test_setup_1 = __importDefault(require("../../test_setup"));
const db_1 = __importDefault(require("@/db"));
let api;
let server;
let agent;
const userData = {
    username: 'testuser',
    password: '123',
    firstName: 'test',
    lastName: 'user',
    email: 'test@user.com',
    confirm_password: '123',
    dob: '11-28-1998',
    role: 'admin',
};
const onlyCourse = {
    title: 'Course #1',
    description: 'Test course #1 Description',
    createdBy: 1,
};
const courseWithTags = {
    title: 'Course #2',
    description: 'Test course #2 Description',
    createdBy: 1,
    courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
};
// const courseWithLessons = {
//   title: 'Course #1',
//   description: 'Test course #1 Description',
//   createdBy: 1,
//   lessons: [
//     { title: 'Lesson #1', content: 'Dummy Lesson 1' },
//     { title: 'Lesson #2', content: 'Dummy Lesson 2' },
//     { title: 'Lesson #3', content: 'Dummy Lesson 3' },
//   ],
// };
const courseWithTagsAndLessons = {
    title: 'Course #1',
    description: 'Test course #1 Description',
    createdBy: 1,
    lessons: [
        { title: 'Lesson #1', content: 'Dummy Lesson 1' },
        { title: 'Lesson #2', content: 'Dummy Lesson 2' },
        { title: 'Lesson #3', content: 'Dummy Lesson 3' },
        { title: 'Lesson #4', content: 'Dummy Lesson 4' },
        { title: 'Lesson #5', content: 'Dummy Lesson 5' },
    ],
    courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
};
const courseWithQuizzies = {
    title: 'Course #1',
    description: 'Test course #1 Description',
    createdBy: 1,
    lessons: [{ title: 'Lesson #1', content: 'Dummy Lesson 1' }],
    courseTags: [{ name: 'test' }, { name: 'course' }, { name: 'dummy' }],
    quizzies: [{ title: 'Chapter #1 Quiz' }, { title: 'Chapter #2 Quiz' }],
};
describe('Test Course Routes', () => {
    beforeAll(async () => {
        server = test_setup_1.default.listen(9000);
        agent = supertest_1.default.agent(server);
        api = (0, supertest_1.default)(server);
        await db_1.default.sync({ force: true });
        await agent.post('/auth/register').send(userData);
    });
    afterAll(async () => {
        server.close();
    });
    it('GET /courses', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(0);
    });
    it('GET /users/:id', async () => {
        const response = await api.get('/courses/1');
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    });
    it('POST /courses with no user logged in', async () => {
        const response = await api.post('/courses').send(onlyCourse);
        expect(response.status).toBe(401);
        expect(response.text).toBe('unauthorized');
    });
    it('POST /courses with auth user', async () => {
        const response = await agent.post('/courses').send(onlyCourse);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(onlyCourse.title);
    });
    it('GET /courses after adding 1st course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(1);
    });
    it('GET /courses/:id after adding 1st course', async () => {
        const response = await api.get('/courses/1');
        expect(response.status).toBe(200);
        expect(response.body.title).toEqual(onlyCourse.title);
    });
    it('PUT /course/:id with unauthorized user', async () => {
        const response = await api.put('/courses/1').send({
            title: 'Edit Course #1',
        });
        expect(response.status).toBe(401);
        expect(response.text).toBe('unauthorized');
    });
    it('PUT /course/:id with auth user', async () => {
        const response = await agent.put('/courses/1').send({
            title: 'Edit Course #1',
        });
        expect(response.status).toBe(200);
        expect(response.body[0]).toBe(1);
    });
    it('GET /courses after adding 1st course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body[0].title).toBe('Edit Course #1');
    });
    it('GET /courses/:id after adding 1st course', async () => {
        const response = await api.get('/courses/1');
        expect(response.status).toBe(200);
        expect(response.body.title).not.toEqual(onlyCourse.title);
        expect(response.body.title).toEqual('Edit Course #1');
    });
    it('POST /courses with tags & auth user', async () => {
        const response = await agent.post('/courses').send(courseWithTags);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(courseWithTags.title);
        expect(response.body.courseTags).toBeInstanceOf(Array);
        expect(response.body.courseTags.length).toBe(3);
    });
    it('GET /courses after adding 2nd course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body[0].courseTags.length).toBe(3);
    });
    it('POST /courses with tags & lessons auth user', async () => {
        const response = await agent
            .post('/courses')
            .send(courseWithTagsAndLessons);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(courseWithTagsAndLessons.title);
        expect(response.body.courseTags).toBeInstanceOf(Array);
        expect(response.body.courseTags.length).toBe(3);
        expect(response.body.lessons.length).toBe(5);
    });
    it('GET /courses after adding 3rd course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body[0].courseTags.length).toBe(3);
        expect(response.body[0].lessons.length).toBe(5);
    });
    it('POST /courses with tags & lessons & quizzies auth user', async () => {
        const response = await agent.post('/courses').send(courseWithQuizzies);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(courseWithQuizzies.title);
        expect(response.body.courseTags).toBeInstanceOf(Array);
        expect(response.body.courseTags.length).toBe(3);
        expect(response.body.lessons.length).toBe(1);
        expect(response.body.quizzies.length).toBe(2);
    });
    it('GET /courses after adding 3rd course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body[0].courseTags.length).toBe(3);
        expect(response.body[0].lessons.length).toBe(1);
        expect(response.body[0].quizzies.length).toBe(2);
    });
    it('PUT /courses/:id for course with lessons & tags', async () => {
        const response = await agent.put('/courses/1').send({
            title: 'Content Edited',
            description: 'Content Edited',
        });
        expect(response.status).toBe(200);
        expect(response.body[0]).toBe(1);
    });
    it('GET /courses after adding 3rd course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body.some((course) => course.title == 'Content Edited')).toBe(true);
        expect(response.body.length).toBe(4);
    });
    it('GET /courses/4/lessons', async () => {
        const response = await api.get('/courses/4/lessons');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        const response2 = await api.get('/courses/3/lessons');
        expect(response2.status).toBe(200);
        expect(response2.body.length).toBe(5);
    });
    it('DELETE /courses/:id for course with lessons & tags', async () => {
        const response = await agent.delete('/courses/4');
        expect(response.status).toBe(200);
        expect(response.body).toBe(1);
    });
    it('GET /courses after adding 3rd course', async () => {
        const response = await api.get('/courses');
        expect(response.status).toBe(200);
        expect(response.body.some((course) => course.title == 'Content Edited')).toBe(true);
        expect(response.body.length).toBe(3);
    });
});
