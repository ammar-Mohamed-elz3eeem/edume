import request, { Agent } from 'supertest';
import app from '../../test_setup';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import sequelize from '@/db';
import { courses, users } from '@/utils/seeds';
import { ICourse, IUser } from '@/types';

let api: TestAgent;
let server: Server;
let agent: Agent;

describe('Test Course Routes', () => {
  beforeAll(async () => {
    server = app.listen(9000);
    agent = request.agent(server);
    api = request(server);
    await sequelize.sync({ force: true });
    await Promise.all(
      users.map(
        async (user: IUser) => await agent.post('/auth/register').send(user),
      ),
    );
    await Promise.all(
      courses.map(
        async (course: ICourse) => await agent.post('/courses').send(course),
      ),
    );
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
