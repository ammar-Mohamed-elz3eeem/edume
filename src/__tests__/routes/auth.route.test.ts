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

describe('Test Auth Routes', () => {
  beforeAll(async () => {
    server = app.listen(9000);
    agent = request.agent(server);
    api = request(server);
    await sequelize.sync({ force: true });
  });
  afterAll(async () => {
    server.close();
  });

  it('GET /auth not logged in user', async () => {
    const response = await api.get('/auth');
    expect(response.status).toBe(401);
    expect(response.text).toBe('unauthorized');
  });

  it('POST /auth/register password & confirm not same', async () => {
    const response = await api.post('/auth/register').send({
      username: 'testuser',
      password: '123',
      firstName: 'test',
      lastName: 'user',
      email: 'test@user.com',
      confirm_password: '321',
      dob: '11-28-1998',
      role: 'admin',
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('password & confirm password must be identical');
  });

  it('POST /auth/register firstName is missing', async () => {
    const response = await api.post('/auth/register').send({
      username: 'testuser',
      password: '123',
      lastName: 'user',
      email: 'test@user.com',
      confirm_password: '321',
      dob: '11-28-1998',
      role: 'admin',
    });
    expect(response.status).toBe(400);
    expect(response.text).toBe('all fields are required');
  });

  it('POST /auth/register with all info', async () => {
    const response = await agent.post('/auth/register').send(userData);
    expect(response.headers.location).toBe('/auth');
    expect(response.status).toBe(302);
    expect(response.text).toContain('Redirecting to');
  });

  it('GET /auth after registeration', async () => {
    const response = await agent.get('/auth');
    expect(response.status).toBe(200);
    expect(response.text).toBe('you are authenticated');
  });

  it('POST /auth/logout after registeration', async () => {
    const response = await agent.post('/auth/logout');
    expect(response.status).toBe(302);
    expect(response.text).toContain('Redirecting to');
  });

  it('POST /auth/logout with no user logged in', async () => {
    const response = await api.post('/auth/logout');
    expect(response.status).toBe(401);
    expect(response.text).toContain('unauthorized');
  });
});
