import { Model } from 'sequelize';
import { config } from 'dotenv';
config();

import sequelize from '@/db';
import { User } from '@/models/index';
import { Group } from '@/models/index';
import { Course } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model;
  let course: Model;
  let group: Model;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    user = await User.create({
      firstName: 'ammar',
      lastName: 'Massoud',
      username: 'ammar-koa',
      email: 'ammar@gmail.com',
      password: '158269347',
    });

    course = await Course.create({
      title: '#3 Course',
      description: 'COOOOOOOOOOOOntent',
      createdBy: user.dataValues.id,
    });
  });

  it("can't create group with no createdBy", async () => {
    const failed = Group.create({
      name: 'No Content',
      courseId: course.dataValues.id,
    });

    expect(failed).rejects.toThrow(Error);
  });

  it("can't create group with no courseId", async () => {
    const failed = Group.create({
      name: 'No Content',
      createdBy: user.dataValues.id,
    });

    expect(failed).rejects.toThrow(Error);
  });

  it("can't create group with invalid courseId", async () => {
    const failed = Group.create({
      name: 'No Content',
      createdBy: user.dataValues.id,
      courseId: 99999999999,
    });

    expect(failed).rejects.toThrow(Error);
  });

  it("can't create group with invalid createdBy", async () => {
    const failed = Group.create({
      name: 'No Content',
      createdBy: 99999999999,
      courseId: course.dataValues.id,
    });

    expect(failed).rejects.toThrow(Error);
  });

  it('create group', async () => {
    group = await Group.create({
      name: 'No Content',
      createdBy: user.dataValues.id,
      courseId: course.dataValues.id,
    });

    expect(group.dataValues.id).toBeGreaterThan(0);
  });

  it('edit group', async () => {
    const updated = await Group.update(
      {
        name: 'New Content :)',
      },
      { where: { id: group.dataValues.id } },
    );

    expect(updated[0]).toBeGreaterThan(0);
  });

  it('get Group from course', async () => {
    const courseWithgroup = await Course.findAll({
      include: [{ model: Group, as: 'course_groups' }],
    });
    expect(courseWithgroup[0].dataValues.course_groups.length).toBeGreaterThan(
      0,
    );
  });

  it('delete group', async () => {
    const deleted = await Group.destroy({ where: { id: group.dataValues.id } });

    expect(deleted).toBeGreaterThan(0);
  });
});
