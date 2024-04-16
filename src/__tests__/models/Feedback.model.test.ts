import { Model } from 'sequelize';
import { config } from 'dotenv';
config();

import sequelize from '@/db';
import { Feedback } from '@/models/index';
import { User } from '@/models/index';
import { Course } from '@/models/index';

describe('Test Feedback Model', () => {
  let user1: Model | null;
  let course1: Model | null;
  let feedback: Model | null;

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

      course1 = await Course.create({
        title: 'Test Course #1',
        description: 'Test Course #1 Description',
        createdBy: user1.dataValues.id,
      });
    } catch (error) {
      console.log(error);
    }
  });

  it('test adding feedback without specifing courseId', async () => {
    const failedFeedback = Feedback.create({
      comment: 'This is my rating for course #1',
      rating: 4.3,
      userId: user1?.dataValues.id,
    });

    expect(failedFeedback).rejects.toThrow(Error);
  });

  it('test adding feedback without specifing userId', async () => {
    const failedFeedback = Feedback.create({
      comment: 'This is my rating for course #1',
      rating: 4.3,
      courseId: course1?.dataValues.id,
    });

    expect(failedFeedback).rejects.toThrow(Error);
  });

  it('test adding feedback with invalid courseId', async () => {
    const failedFeedback = Feedback.create({
      comment: 'This is my rating for course #1',
      rating: 4.3,
      userId: 999999999999,
      courseId: course1?.dataValues.id,
    });

    expect(failedFeedback).rejects.toThrow(Error);
  });

  it('test adding feedback with invalid userId', async () => {
    const failedFeedback = Feedback.create({
      comment: 'This is my rating for course #1',
      rating: 4.3,
      courseId: 999999999999,
      userId: user1?.dataValues.id,
    });

    expect(failedFeedback).rejects.toThrow(Error);
  });

  it('test adding feedback', async () => {
    feedback = await Feedback.create({
      comment: 'This is my rating for course #1',
      rating: 4.3,
      courseId: course1?.dataValues.id,
      userId: course1?.dataValues.id,
    });

    expect(feedback).toBeDefined;
    expect(feedback.dataValues.id).toBeGreaterThan(0);
  });

  it('test adding feedback with same userId and courseId', async () => {
    const errorFeedback = Feedback.create({
      comment: 'This is my rating for course #1',
      rating: 4.3,
      courseId: course1?.dataValues.id,
      userId: course1?.dataValues.id,
    });

    expect(errorFeedback).rejects.toThrow(Error);

    const allFeedback = await Feedback.findAll();
    expect(allFeedback.length).toBe(1);
  });
});
