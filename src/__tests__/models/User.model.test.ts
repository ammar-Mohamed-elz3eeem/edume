import { config } from 'dotenv';
config();
import sequelize from '@/db';
import { Model } from 'sequelize';
import { User } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('test add user', async () => {
    user = await User.create({
      firstName: 'ammar',
      lastName: 'Massoud',
      username: 'ammar-koa',
      email: 'ammar@gmail.com',
      password: '158269347',
    });
    expect(user.dataValues.id).toBeGreaterThan(0);
  });

  it('test update user', async () => {
    const updatedUser = await User.update(
      {
        username: 'ammar-jest',
      },
      {
        where: { id: user.dataValues.id },
      },
    );
    expect(updatedUser[0]).toBeGreaterThan(0);
  });

  it('test get user', async () => {
    const foundUser = await User.findOne({
      where: { username: 'ammar-jest' },
    });

    expect(foundUser?.dataValues.id).toBe(user.dataValues.id);
  });

  it('test delete user', async () => {
    const deletedUser = await User.destroy({
      where: { id: user.dataValues.id },
    });
    expect(deletedUser).toBeGreaterThan(0);
  });
});
