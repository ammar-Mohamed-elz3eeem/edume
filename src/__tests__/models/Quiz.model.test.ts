import { Model } from 'sequelize';
import { config } from 'dotenv';
config();

import sequelize from '@/db';
import { Course } from '@/models/index';
import { Quiz } from '@/models/index';
import { User } from '@/models/index';
import { Question } from '@/models/index';

describe('Test Quiz Model', () => {
  let user: Model;
  let course: Model;
  let quiz: Model;

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
      title: 'Course #4',
      description: 'Course #4 Description',
      createdBy: user.dataValues.id,
    });
  });

  it('Add Quiz with without course id', async () => {
    const failedQuiz = Quiz.create({
      title: '#1 Quiz',
    });
    expect(failedQuiz).rejects.toThrow(Error);
  });

  it('Add Quiz with invalid course id', async () => {
    const failedQuiz = Quiz.create({
      title: '#1 Quiz',
      courseId: 999999999,
    });
    expect(failedQuiz).rejects.toThrow(Error);
  });

  it('Add Quiz with valid course id', async () => {
    quiz = await Quiz.create({
      title: '#1 Quiz',
      courseId: course.dataValues.id,
    });
    expect(quiz.dataValues.id).toBeGreaterThan(0);
  });

  it('Add Questions to Quiz', async () => {
    const quizWithQuestions = await Quiz.create(
      {
        title: '#1 Quiz',
        courseId: course.dataValues.id,
        questions: [
          { content: 'This is Question #1' },
          { content: 'This is Question #2' },
        ],
      },
      { include: { model: Question, as: 'questions' } },
    );

    expect(quizWithQuestions.dataValues.questions.length).toBe(2);
  });
});
