// import Answer from '@/models/Answer.model';
// import Course from '@/models/Course.model';
// import Enrollment from '@/models/Enrollment.model';
// import Feedback from '@/models/Feedback.model';
// import Group from '@/models/Group.model';
// import Lesson from '@/models/Lesson.model';
// import Question from '@/models/Question.model';
// import Quiz from '@/models/Quiz.model';
// import Resource from '@/models/Resource.model';
// import Tag from '@/models/Tag.model';

import {
  Answer,
  Attachment,
  Course,
  CourseProgress,
  Enrollment,
  Feedback,
  Group,
  Lesson,
  Question,
  Quiz,
  Resource,
  Tag,
} from '@/models';
import { ICourse } from '@/types';
import { Context } from 'koa';

export default class CourseController {
  static async addCourse(ctx: Context) {
    const {
      description,
      title,
      courseTags,
      quizzies,
      createdBy,
      lessons,
      resources,
    } = ctx.request.body as ICourse;

    let image = '';
    if (!(ctx.request.files instanceof Array)) {
      image = (
        ctx.request.files!['featuredImage'] as unknown as {
          [k: string]: string;
        }
      ).newFilename;
    }

    const courseInfo: ICourse = {
      title,
      description,
      createdBy,
      featuredImage: image,
    };
    if (!title || !description) {
      return ctx.throw(400, 'All Fields are required');
    }
    const includes = [];
    if (courseTags) {
      courseInfo['courseTags'] = courseTags;
      includes.push({ model: Tag, as: 'courseTags' });
    }

    if (lessons) {
      courseInfo['lessons'] = lessons;
      if (ctx.request.files instanceof Object) {
        Object.keys(ctx.request.files).map((key) => {
          const indexes = key.match(/[0-9]+/gi);
          if (indexes) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [lessonId, attachId]: string[] = [...indexes];
            if (lessons[Number(lessonId)].attachments instanceof Array) {
              let src = '';
              if (!(ctx.request.files instanceof Array)) {
                src = (
                  ctx.request.files![key] as unknown as {
                    [k: string]: string;
                  }
                ).newFilename;
              } else {
                src = ctx.request.files![0].newFilename;
              }
              lessons[Number(lessonId)].attachments = [
                ...lessons[Number(lessonId)].attachments,
                {
                  src: src,
                  type: 'image',
                },
              ];
            } else {
              lessons[Number(lessonId)].attachments = [
                {
                  src: (
                    ctx.request.files![key] as unknown as {
                      [k: string]: string;
                    }
                  ).newFilename,
                  type: 'image',
                },
              ];
            }
          }
        });
      }
      includes.push({
        model: Lesson,
        as: 'lessons',
        include: [{ model: Attachment, as: 'attachments' }],
      });
    }
    if (resources) {
      courseInfo['resources'] = resources;
      includes.push({ model: Resource, as: 'resources' });
    }
    if (quizzies) {
      courseInfo['quizzies'] = quizzies;
      includes.push({ model: Quiz, as: 'quizzies' });
    }
    try {
      const courseAdded = await Course.create(
        { ...courseInfo },
        {
          include: includes,
        },
      );
      ctx.body = courseAdded.dataValues;
    } catch (error) {
      console.log(error);
    }
  }

  static async editCourse(ctx: Context) {
    try {
      const updateResult = await Course.update(ctx.request.body!, {
        where: { id: ctx.params.id },
      });
      ctx.body = updateResult;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async deleteCourses(ctx: Context) {
    try {
      const deleteResult = await Course.destroy({
        where: { id: ctx.params.id },
      });
      ctx.body = deleteResult;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getCourse(ctx: Context) {
    try {
      const course = await Course.findByPk(ctx.params.id, {
        include: [
          { model: Tag, as: 'courseTags' },
          {
            model: Lesson,
            as: 'lessons',
            include: [{ model: Attachment, as: 'attachments' }],
          },
          { model: Resource, as: 'resources' },
          { model: Feedback, as: 'feedbacks' },
          {
            model: Quiz,
            as: 'quizzies',
            include: [
              {
                model: Question,
                as: 'questions',
                include: [{ model: Answer, as: 'answers' }],
              },
            ],
          },
        ],
      });
      return (ctx.body = course?.dataValues);
    } catch (error) {
      return ctx.throw(500, (error as Error).message);
    }
  }

  static async getCourses(ctx: Context) {
    try {
      ctx.body = await Course.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          { model: Tag, as: 'courseTags' },
          {
            model: Lesson,
            as: 'lessons',
            include: [{ model: Attachment, as: 'attachments' }],
          },
          { model: Resource, as: 'resources' },
          { model: Feedback, as: 'feedbacks' },
          { model: CourseProgress, as: 'CourseProgresses' },
          {
            model: Quiz,
            as: 'quizzies',
            include: [
              {
                model: Question,
                as: 'questions',
                include: [{ model: Answer, as: 'answers' }],
              },
            ],
          },
        ],
      });
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getLessonsByCourseId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const lessonsByCourseId = await Lesson.findAll({
        where: { courseId: id },
      });
      ctx.body = lessonsByCourseId;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getQuizziesByCourseId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const quizziesByCourseId = await Quiz.findAll({
        where: { courseId: id },
      });
      ctx.body = quizziesByCourseId;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getCourseEnrollmentsByCourseId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const enrollmentsByCourseId = await Enrollment.findAll({
        where: { courseId: id },
      });
      ctx.body = enrollmentsByCourseId;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getFeedbacksForCourseId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const courseFeedbacks = await Feedback.findAll({
        where: { courseId: id },
      });
      ctx.body = courseFeedbacks;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getGroupsByCourseId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const courseFeedbacks = await Group.findAll({
        where: { courseId: id },
      });
      ctx.body = courseFeedbacks;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }

  static async getResourcesByCourseId(ctx: Context) {
    const { id } = ctx.params;
    try {
      const courseFeedbacks = await Resource.findAll({
        where: { courseId: id },
      });
      ctx.body = courseFeedbacks;
    } catch (error) {
      ctx.throw(500, (error as Error).message);
    }
  }
}
