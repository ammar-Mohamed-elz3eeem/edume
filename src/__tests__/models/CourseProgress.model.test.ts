import { config } from 'dotenv';
config();
import sequelize from '@/db';
import { Model } from 'sequelize';
import { Course } from '@/models/index';
import { User } from '@/models/index';
import { Lesson } from '@/models/index';
import { CourseProgress } from '@/models/index';

describe('Test User Mode', () => {
  let user: Model | null;
  let course: Model | null;
  let lesson: Model | null;
  let progress: Model | null;

  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
    } catch (error) {
      console.log(error);
    }
  });

  it('test add progress for course', async () => {
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
      courseId: course.dataValues.id,
    });

    lesson = await Lesson.create({
      title: 'This is #2 Lesson',
      content: 'This is #2 Lesson Content',
      courseId: course.dataValues.id,
    });

    lesson = await Lesson.create({
      title: 'This is #3 Lesson',
      content: 'This is #3 Lesson Content',
      courseId: course.dataValues.id,
    });

    const courseWithLessons = await Course.findByPk(course.dataValues.id, {
      include: { model: Lesson, as: 'lessons' },
    });

    progress = await CourseProgress.create({
      userId: user.dataValues.id,
      lessonId: lesson.dataValues.id,
      courseId: course.dataValues.id,
      completed: true,
      progressPercentage: (
        (1 / courseWithLessons?.dataValues.lessons.length) *
        100
      ).toFixed(2),
    });

    expect(progress?.dataValues.id).toBeGreaterThan(0);
  });

  it('test add lesson with invalid course id', async () => {
    const foundPorgress = CourseProgress.create({
      userId: user?.dataValues.id,
      lessonId: 999999999,
      courseId: course?.dataValues.id,
    });

    expect(foundPorgress).rejects.toThrow(Error);
  });

  it('test update course progress', async () => {
    const updatedProgress = await CourseProgress.update(
      {
        lastAccessedAt: new Date(),
        userId: user?.dataValues.id,
        lessonId: lesson?.dataValues.id,
        courseId: course?.dataValues.id,
        progressPercentage: 90,
        completed: false,
      },
      {
        where: { id: progress?.dataValues.id },
      },
    );
    expect(updatedProgress[0]).toBeGreaterThan(0);
  });

  it('test get course', async () => {
    const foundProgress = await CourseProgress.findOne({
      where: {
        lessonId: lesson?.dataValues.id,
        courseId: course?.dataValues.id,
        userId: user?.dataValues.id,
      },
    });

    expect(foundProgress?.dataValues.id).toBe(progress?.dataValues.id);
    expect(foundProgress?.dataValues.progressPercentage).toBe(90);
  });

  it('test delete user', async () => {
    const deletedProgress = await CourseProgress.destroy({
      where: {
        lessonId: lesson?.dataValues.id,
        courseId: course?.dataValues.id,
        userId: user?.dataValues.id,
      },
    });
    expect(deletedProgress).toBeGreaterThan(0);
  });
});
