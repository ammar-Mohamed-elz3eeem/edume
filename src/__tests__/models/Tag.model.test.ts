import { config } from 'dotenv';
import { Model } from 'sequelize';
config();
import sequelize from '@/db';
import { Tag } from '@/models/index';
import { Course } from '@/models/index';
import { User } from '@/models/index';
import { CourseTag } from '@/models/index';

describe('Test Tags Model', () => {
  let user: Model | null;
  let course: Model | null;
  let tags: Model[] | null;
  let courseTags: Model[] | null;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('Test add new Tag', async () => {
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

    tags = await Tag.bulkCreate([
      { name: 'programming' },
      { name: 'c++' },
      { name: 'javascript' },
    ]);

    expect(tags.length).toBe(3);
  });

  it('add new courseTags with invalid tag', async () => {
    const invalidTag = CourseTag.bulkCreate([
      { CourseId: course?.dataValues.id, TagId: 9999999999 },
      { CourseId: course?.dataValues.id, TagId: tags![1].dataValues.id },
      { CourseId: course?.dataValues.id, TagId: tags![2].dataValues.id },
    ]);

    expect(invalidTag).rejects.toThrow(Error);
  });

  it('add new courseTags', async () => {
    courseTags = await CourseTag.bulkCreate([
      { CourseId: course?.dataValues.id, TagId: tags![0].dataValues.id },
      { CourseId: course?.dataValues.id, TagId: tags![1].dataValues.id },
      { CourseId: course?.dataValues.id, TagId: tags![2].dataValues.id },
    ]);

    expect(courseTags.length).toBe(3);
  });

  it('course tags exists', async () => {
    const courseWithTags = await Course.findByPk(course?.dataValues.id, {
      include: [{ model: Tag, as: 'courseTags' }],
    });
    expect(courseWithTags?.dataValues.courseTags.length).toBe(3);
  });

  it('update single tag will reflect on courses', async () => {
    const updatedTag = await Tag.update(
      { name: 'essentials' },
      { where: { id: tags![1].dataValues.id } },
    );
    expect(updatedTag[0]).toBe(1);
    const courseWithTags = await Course.findByPk(course?.dataValues.id, {
      include: [{ model: Tag, as: 'courseTags' }],
    });
    expect(courseWithTags?.dataValues.courseTags[2].dataValues.name).toBe(
      'essentials',
    );
  });

  it('delete tags will not throw an error', async () => {
    await Tag.destroy({
      where: { id: tags![0].dataValues.id },
    });

    const courseWithTags = await Course.findByPk(course?.dataValues.id, {
      include: [{ model: Tag, as: 'courseTags' }],
    });
    expect(courseWithTags?.dataValues.courseTags.length).toBe(2);
  });

  it('delete courseTag and course will have only 1 tag', async () => {
    await CourseTag.destroy({
      where: { id: courseTags![1].dataValues.id },
    });

    const courseWithTags = await Course.findByPk(course?.dataValues.id, {
      include: [{ model: Tag, as: 'courseTags' }],
    });

    expect(courseWithTags?.dataValues.courseTags.length).toBe(1);

    const tags = await Tag.findAll();

    expect(tags.length).toBe(2);
  });
});
