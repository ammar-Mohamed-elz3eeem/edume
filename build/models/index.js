"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = exports.UserActivity = exports.User = exports.Resource = exports.Quiz = exports.Question = exports.Notification = exports.Lesson = exports.Group = exports.ForumGroup = exports.Feedback = exports.Enrollment = exports.Answer = exports.Tag = exports.CourseTag = exports.CourseProgress = exports.Course = void 0;
const Answer_model_1 = __importDefault(require("./Answer.model"));
exports.Answer = Answer_model_1.default;
const Course_model_1 = __importDefault(require("./Course.model"));
exports.Course = Course_model_1.default;
const CourseProgress_model_1 = __importDefault(require("./CourseProgress.model"));
exports.CourseProgress = CourseProgress_model_1.default;
const CourseTag_model_1 = __importDefault(require("./CourseTag.model"));
exports.CourseTag = CourseTag_model_1.default;
const Enrollment_model_1 = __importDefault(require("./Enrollment.model"));
exports.Enrollment = Enrollment_model_1.default;
const Feedback_model_1 = __importDefault(require("./Feedback.model"));
exports.Feedback = Feedback_model_1.default;
const Forum_model_1 = __importDefault(require("./Forum.model"));
exports.ForumGroup = Forum_model_1.default;
const Group_model_1 = __importDefault(require("./Group.model"));
exports.Group = Group_model_1.default;
const Lesson_model_1 = __importDefault(require("./Lesson.model"));
exports.Lesson = Lesson_model_1.default;
const Notification_model_1 = __importDefault(require("./Notification.model"));
exports.Notification = Notification_model_1.default;
const Question_model_1 = __importDefault(require("./Question.model"));
exports.Question = Question_model_1.default;
const Quiz_model_1 = __importDefault(require("./Quiz.model"));
exports.Quiz = Quiz_model_1.default;
const Resource_model_1 = __importDefault(require("./Resource.model"));
exports.Resource = Resource_model_1.default;
const Tag_model_1 = __importDefault(require("./Tag.model"));
exports.Tag = Tag_model_1.default;
const User_model_1 = __importDefault(require("./User.model"));
exports.User = User_model_1.default;
const UserActivity_model_1 = __importDefault(require("./UserActivity.model"));
exports.UserActivity = UserActivity_model_1.default;
const Attachment_model_1 = __importDefault(require("./Attachment.model"));
exports.Attachment = Attachment_model_1.default;
Lesson_model_1.default.hasMany(Attachment_model_1.default, {
    as: 'attachments',
    foreignKey: 'lessonId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Course_model_1.default.hasMany(Feedback_model_1.default, {
    as: 'feedbacks',
    foreignKey: 'courseId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Feedback_model_1.default.belongsTo(Course_model_1.default, {
    as: 'course_feedbacks',
    foreignKey: 'courseId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Question_model_1.default.hasMany(Answer_model_1.default, {
    as: 'answers',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'questionId',
});
User_model_1.default.hasMany(CourseProgress_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
CourseProgress_model_1.default.belongsTo(User_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Course_model_1.default.hasMany(CourseProgress_model_1.default, {
    foreignKey: 'courseId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
CourseProgress_model_1.default.belongsTo(Course_model_1.default, {
    foreignKey: 'courseId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Lesson_model_1.default.hasMany(CourseProgress_model_1.default, {
    foreignKey: 'lessonId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
CourseProgress_model_1.default.belongsTo(Lesson_model_1.default, {
    foreignKey: 'lessonId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
User_model_1.default.hasMany(Enrollment_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'enrollments',
});
Enrollment_model_1.default.belongsTo(User_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'enrolledBy',
});
Course_model_1.default.hasMany(Enrollment_model_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'enrollments',
    foreignKey: 'courseId',
});
Course_model_1.default.belongsTo(User_model_1.default, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'enrolled_at',
    foreignKey: 'courseId',
});
Forum_model_1.default.belongsTo(User_model_1.default, {
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'users',
});
Group_model_1.default.belongsTo(User_model_1.default, {
    foreignKey: 'createdBy',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'user_group',
});
User_model_1.default.hasMany(Group_model_1.default, {
    foreignKey: 'createdBy',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'user_groups',
});
Course_model_1.default.hasMany(Group_model_1.default, {
    foreignKey: 'courseId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'course_groups',
});
Group_model_1.default.belongsTo(Course_model_1.default, {
    foreignKey: 'courseId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'course_group',
});
Course_model_1.default.hasMany(Lesson_model_1.default, {
    as: 'lessons',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'courseId',
});
Quiz_model_1.default.hasMany(Question_model_1.default, {
    as: 'questions',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'quizId',
});
Course_model_1.default.hasMany(Quiz_model_1.default, {
    as: 'quizzies',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'courseId',
});
Course_model_1.default.hasMany(Resource_model_1.default, {
    as: 'resources',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'courseId',
});
Tag_model_1.default.belongsToMany(Course_model_1.default, {
    through: CourseTag_model_1.default,
    as: 'tagCourses',
});
Course_model_1.default.belongsToMany(Tag_model_1.default, {
    through: CourseTag_model_1.default,
    as: 'courseTags',
});
User_model_1.default.hasMany(Notification_model_1.default, {
    as: 'notifications',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'userId',
});
User_model_1.default.hasMany(Course_model_1.default, {
    foreignKey: 'createdBy',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    as: 'courses',
});
User_model_1.default.hasMany(UserActivity_model_1.default, {
    as: 'activities',
    onDelete: 'cascade',
    onUpdate: 'cascade',
    foreignKey: 'userId',
});
Feedback_model_1.default.belongsTo(User_model_1.default, {
    as: 'user_feedbacks',
    foreignKey: 'userId',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
