import { config } from 'dotenv';
config();
import sequelize from '@/db';
import { Model } from 'sequelize';
import { Course } from '@/models/index';
import { User } from '@/models/index';
import { Lesson } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model | null;
  let course: Model | null;
  let lesson: Model | null;

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  it('test add lesson', async () => {
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

    lesson = await Lesson.create({
      title: 'This is #1 Lesson',
      content: 'This is #1 Lesson Content',
      courseId: course?.dataValues.id,
    });

    course = await Course.findByPk(course.dataValues.id, {
      include: { model: Lesson, as: 'lessons' },
    });

    expect(course?.dataValues.lessons[0].dataValues.id).toBe(
      lesson.dataValues.id,
    );
    expect(course?.dataValues.lessons.length).toBe(1);
  });

  it('test add lesson with invalid course id', async () => {
    const failedLesson = Lesson.create({
      title: 'This is #1 Lesson',
      content: 'This is #1 Lesson Content',
      CourseId: 999999,
    });

    expect(failedLesson).rejects.toThrow(Error);
  });

  it('test add lesson within course', async () => {
    course = await Course.create(
      {
        title: 'Test Course #2',
        description: 'Test Course #2 Desscription',
        lessons: [
          { title: 'Test Lesson #2', content: 'Test Lesson #2 content' },
          { title: 'Test Lesson #3', content: 'Test Lesson #3 content' },
        ],
        createdBy: user?.dataValues.id,
      },
      { include: { model: Lesson, as: 'lessons' } },
    );

    expect(course.dataValues.lessons.length).toBe(2);
  });

  it('test update lesson', async () => {
    const updatedLesson = await Lesson.update(
      {
        title: 'Test Lesson #1 Edited',
        description: 'Test Lesson #1 Description Edited',
      },
      {
        where: { id: lesson?.dataValues.id },
      },
    );
    expect(updatedLesson[0]).toBeGreaterThan(0);
  });

  it('test get course', async () => {
    const foundLesson = await Lesson.findOne({
      where: { id: lesson?.dataValues.id },
    });

    expect(foundLesson?.dataValues.id).toBe(lesson?.dataValues.id);
    expect(foundLesson?.dataValues.title).toBe('Test Lesson #1 Edited');
  });

  it('test delete user', async () => {
    const deletedLesson = await Lesson.destroy({
      where: { id: lesson?.dataValues.id },
    });
    expect(deletedLesson).toBeGreaterThan(0);
  });
});
