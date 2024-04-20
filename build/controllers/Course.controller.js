"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
class CourseController {
    static async addCourse(ctx) {
        const { description, title, courseTags, quizzies, createdBy, lessons, resources, } = ctx.request.body;
        let image = '';
        if (!(ctx.request.files instanceof Array)) {
            image = ctx.request.files['featuredImage'].newFilename;
        }
        const courseInfo = {
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
            includes.push({ model: models_1.Tag, as: 'courseTags' });
        }
        if (lessons) {
            courseInfo['lessons'] = lessons;
            if (ctx.request.files instanceof Object) {
                Object.keys(ctx.request.files).map((key) => {
                    const indexes = key.match(/[0-9]+/gi);
                    if (indexes) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const [lessonId, attachId] = [...indexes];
                        if (lessons[Number(lessonId)].attachments instanceof Array) {
                            let src = '';
                            if (!(ctx.request.files instanceof Array)) {
                                src = ctx.request.files[key].newFilename;
                            }
                            else {
                                src = ctx.request.files[0].newFilename;
                            }
                            lessons[Number(lessonId)].attachments = [
                                ...lessons[Number(lessonId)].attachments,
                                {
                                    src: src,
                                    type: 'image',
                                },
                            ];
                        }
                        else {
                            lessons[Number(lessonId)].attachments = [
                                {
                                    src: ctx.request.files[key].newFilename,
                                    type: 'image',
                                },
                            ];
                        }
                    }
                });
            }
            includes.push({
                model: models_1.Lesson,
                as: 'lessons',
                include: [{ model: models_1.Attachment, as: 'attachments' }],
            });
        }
        if (resources) {
            courseInfo['resources'] = resources;
            includes.push({ model: models_1.Resource, as: 'resources' });
        }
        if (quizzies) {
            courseInfo['quizzies'] = quizzies;
            includes.push({ model: models_1.Quiz, as: 'quizzies' });
        }
        try {
            const courseAdded = await models_1.Course.create({ ...courseInfo }, {
                include: includes,
            });
            ctx.body = courseAdded.dataValues;
        }
        catch (error) {
            console.log(error);
        }
    }
    static async editCourse(ctx) {
        try {
            const updateResult = await models_1.Course.update(ctx.request.body, {
                where: { id: ctx.params.id },
            });
            ctx.body = updateResult;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async deleteCourses(ctx) {
        try {
            const deleteResult = await models_1.Course.destroy({
                where: { id: ctx.params.id },
            });
            ctx.body = deleteResult;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getCourse(ctx) {
        try {
            const course = await models_1.Course.findByPk(ctx.params.id, {
                include: [
                    { model: models_1.Tag, as: 'courseTags' },
                    {
                        model: models_1.Lesson,
                        as: 'lessons',
                        include: [{ model: models_1.Attachment, as: 'attachments' }],
                    },
                    { model: models_1.Resource, as: 'resources' },
                    { model: models_1.Feedback, as: 'feedbacks' },
                    {
                        model: models_1.Quiz,
                        as: 'quizzies',
                        include: [
                            {
                                model: models_1.Question,
                                as: 'questions',
                                include: [{ model: models_1.Answer, as: 'answers' }],
                            },
                        ],
                    },
                ],
            });
            return (ctx.body = course?.dataValues);
        }
        catch (error) {
            return ctx.throw(500, error.message);
        }
    }
    static async getCourses(ctx) {
        try {
            ctx.body = await models_1.Course.findAll({
                order: [['createdAt', 'DESC']],
                include: [
                    { model: models_1.Tag, as: 'courseTags' },
                    {
                        model: models_1.Lesson,
                        as: 'lessons',
                        include: [{ model: models_1.Attachment, as: 'attachments' }],
                    },
                    { model: models_1.Resource, as: 'resources' },
                    { model: models_1.Feedback, as: 'feedbacks' },
                    { model: models_1.CourseProgress, as: 'CourseProgresses' },
                    {
                        model: models_1.Quiz,
                        as: 'quizzies',
                        include: [
                            {
                                model: models_1.Question,
                                as: 'questions',
                                include: [{ model: models_1.Answer, as: 'answers' }],
                            },
                        ],
                    },
                ],
            });
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getLessonsByCourseId(ctx) {
        const { id } = ctx.params;
        try {
            const lessonsByCourseId = await models_1.Lesson.findAll({
                where: { courseId: id },
            });
            ctx.body = lessonsByCourseId;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getQuizziesByCourseId(ctx) {
        const { id } = ctx.params;
        try {
            const quizziesByCourseId = await models_1.Quiz.findAll({
                where: { courseId: id },
            });
            ctx.body = quizziesByCourseId;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getCourseEnrollmentsByCourseId(ctx) {
        const { id } = ctx.params;
        try {
            const enrollmentsByCourseId = await models_1.Enrollment.findAll({
                where: { courseId: id },
            });
            ctx.body = enrollmentsByCourseId;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getFeedbacksForCourseId(ctx) {
        const { id } = ctx.params;
        try {
            const courseFeedbacks = await models_1.Feedback.findAll({
                where: { courseId: id },
            });
            ctx.body = courseFeedbacks;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getGroupsByCourseId(ctx) {
        const { id } = ctx.params;
        try {
            const courseFeedbacks = await models_1.Group.findAll({
                where: { courseId: id },
            });
            ctx.body = courseFeedbacks;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
    static async getResourcesByCourseId(ctx) {
        const { id } = ctx.params;
        try {
            const courseFeedbacks = await models_1.Resource.findAll({
                where: { courseId: id },
            });
            ctx.body = courseFeedbacks;
        }
        catch (error) {
            ctx.throw(500, error.message);
        }
    }
}
exports.default = CourseController;
