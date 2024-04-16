import request, { Agent } from 'supertest';
import app from '../../test_setup';
import TestAgent from 'supertest/lib/agent';
import { Server } from 'http';
import sequelize from '@/db';

let api: TestAgent;
let server: Server;
let agent: Agent;
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

describe('Test Users Routes', () => {
  beforeAll(async () => {
    server = app.listen(9000);
    agent = request.agent(server);
    api = request(server);
    await sequelize.sync({ force: true });
    await agent.post('/auth/register').send(userData);
  });

  afterAll(async () => {
    server.close();
  });

  it('GET /users no logged in user', async () => {
    const response = await api.get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('GET /users/:id no logged in user', async () => {
    const response = await api.get('/users/1');
    expect(response.status).toBe(401);
    expect(response.text).toBe('unauthorized');
  });

  it('GET /users/:id with auth user', async () => {
    const response = await agent.get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('testuser');
  });

  it('PUT /users/:id with auth user', async () => {
    const response = await agent.put('/users/1').send({
      firstName: 'realtest',
      lastName: 'realuser',
      username: 'realtest-realuser',
    });
    expect(response.status).toBe(200);
    expect(response.body[0]).toBe(1);
  });

  it('GET /users/:id with auth user after PUT request', async () => {
    const response = await agent.get('/users/1');
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('realtest-realuser');
    expect(response.body.firstName).toBe('realtest');
    expect(response.body.lastName).toBe('realuser');
  });

  it('GET /users/ with auth user after PUT request', async () => {
    const response = await agent.get('/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0].username).toBe('realtest-realuser');
    expect(response.body[0].firstName).toBe('realtest');
    expect(response.body[0].lastName).toBe('realuser');
  });

  it('DELETE /users/:id with auth user', async () => {
    const response = await agent.delete('/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toBe(1);
  });

  it('GET /users with auth after DELETE request', async () => {
    const response = await api.get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(0);
  });
});
