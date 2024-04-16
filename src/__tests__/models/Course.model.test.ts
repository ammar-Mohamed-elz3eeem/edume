import { config } from 'dotenv';
config();
import sequelize from '@/db';
import { Model } from 'sequelize';
import { Course } from '@/models/index';
import { User } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model;
  let course: Model;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });
  it('test add course', async () => {
    user = await User.create({
      firstName: 'ammar',
      lastName: 'Massoud',
      username: 'ammar-koa',
      email: 'ammar@gmail.com',
      password: '158269347',
    });

    course = await Course.create({
      title: 'Test Course #1',
      description: 'Test Course #1 Description',
      createdBy: user.dataValues.id,
    });

    expect(course.dataValues.id).toBeGreaterThan(0);
    expect(course.dataValues.createdBy).toBe(user.dataValues.id);
  });

  it('test update course', async () => {
    const updatedCourse = await Course.update(
      {
        title: 'Test Course #1 Edited',
        description: 'Test Course #1 Description Edited',
      },
      {
        where: { id: course.dataValues.id },
      },
    );
    expect(updatedCourse[0]).toBeGreaterThan(0);
  });

  it('test get course', async () => {
    const foundCourse = await Course.findOne({
      where: { id: course.dataValues.id },
    });

    expect(foundCourse?.dataValues.id).toBe(course.dataValues.id);
    expect(foundCourse?.dataValues.title).toBe('Test Course #1 Edited');
  });

  it('test delete user', async () => {
    const deletedcourse = await Course.destroy({
      where: { id: course.dataValues.id },
    });
    expect(deletedcourse).toBeGreaterThan(0);
  });
});
