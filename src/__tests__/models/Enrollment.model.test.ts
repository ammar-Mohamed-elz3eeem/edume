/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Op, where } from 'sequelize';
import { config } from 'dotenv';
config();

import sequelize from '@/db';
import { Course } from '@/models/index';
import { User } from '@/models/index';
import { Enrollment } from '@/models/index';

describe('Test Enrollment Model', () => {
  let user1: Model | null;
  let user2: Model | null;
  let user3: Model | null;
  let course1: Model | null;
  let course2: Model | null;
  let course3: Model | null;
  let enrollment: Model | null;

  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });

      user1 = await User.create({
        firstName: 'ammar',
        lastName: 'Massoud',
        username: 'test-user-1',
        email: 'test1@gmail.com',
        password: '158269347',
      });

      user2 = await User.create({
        firstName: 'ammar',
        lastName: 'Massoud',
        username: 'test-user-2',
        email: 'test2@gmail.com',
        password: '158269347',
      });

      user3 = await User.create({
        firstName: 'ammar',
        lastName: 'Massoud',
        username: 'test-user-3',
        email: 'test3@gmail.com',
        password: '158269347',
      });

      course1 = await Course.create({
        title: 'Test Course #1',
        description: 'Test Course #1 Description',
        createdBy: user1.dataValues.id,
      });

      course2 = await Course.create({
        title: 'Test Course #2',
        description: 'Test Course #2 Description',
        createdBy: user1.dataValues.id,
      });

      course3 = await Course.create({
        title: 'Test Course #3',
        description: 'Test Course #3 Description',
        createdBy: user2.dataValues.id,
      });
    } catch (error) {
      console.log(error);
    }
  });

  it('enroll 3 users on only one course', async () => {
    const allUsers = await User.findAll();
    const allCourses = await Course.findAll();

    expect(allUsers.length).toBeGreaterThanOrEqual(3);
    expect(allCourses.length).toBeGreaterThanOrEqual(3);

    const userEnrollments = Enrollment.bulkCreate([
      {
        courseId: course1?.dataValues.id,
        userId: user1?.dataValues.id,
      },
      {
        courseId: course1?.dataValues.id,
        userId: user2?.dataValues.id,
      },
      {
        courseId: course1?.dataValues.id,
        userId: user3?.dataValues.id,
      },
    ]);

    const getUserWithEnrollments = await User.findByPk(user1?.dataValues.id, {
      include: [{ model: Enrollment, as: 'enrollments' }],
    });

    expect(getUserWithEnrollments?.dataValues.enrollments.length).toBe(1);

    const getCourseWithEnrollments = await Course.findByPk(
      course1?.dataValues.id,
      {
        include: [{ model: Enrollment, as: 'enrollments' }],
      },
    );

    expect(getCourseWithEnrollments?.dataValues.enrollments.length).toBe(3);
  });

  it('enroll all users on all courses', async () => {
    try {
      const userEnrollments = await Enrollment.bulkCreate([
        {
          courseId: course2?.dataValues.id,
          userId: user1?.dataValues.id,
        },
        {
          courseId: course2?.dataValues.id,
          userId: user2?.dataValues.id,
        },
        {
          courseId: course2?.dataValues.id,
          userId: user3?.dataValues.id,
        },
        {
          courseId: course3?.dataValues.id,
          userId: user1?.dataValues.id,
        },
        {
          courseId: course3?.dataValues.id,
          userId: user2?.dataValues.id,
        },
        {
          courseId: course3?.dataValues.id,
          userId: user3?.dataValues.id,
        },
      ]);
      enrollment = userEnrollments[0].dataValues;
      expect((await Enrollment.findAll()).length).toBe(9);
      const allCourses = await Course.findAll({
        include: { model: Enrollment, as: 'enrollments' },
      });
      const allUsers = await Course.findAll({
        include: { model: Enrollment, as: 'enrollments' },
      });
      allCourses.forEach((course) =>
        expect(course.dataValues.enrollments.length).toBe(3),
      );
      allUsers.forEach((user) =>
        expect(user.dataValues.enrollments.length).toBe(3),
      );
    } catch (error) {
      console.log(error);
    }
  });

  it('test finishing course by setting completion_date', async () => {
    const enrollment = await Enrollment.update(
      { completion_date: new Date() },
      {
        where: {
          userId: user1?.dataValues.id,
          courseId: course1?.dataValues.id,
        },
      },
    );
    expect(enrollment[0]).toBe(1);
    const getUserFinishedCourse = await User.findByPk(user1?.dataValues.id, {
      include: [
        {
          model: Enrollment,
          as: 'enrollments',
          where: { completion_date: { [Op.not]: null } },
        },
      ],
    });

    expect(getUserFinishedCourse?.dataValues.enrollments.length).toBe(1);
  });
});
