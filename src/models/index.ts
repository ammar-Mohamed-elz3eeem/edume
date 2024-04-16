import Answer from './Answer.model';
import Course from './Course.model';
import CourseProgress from './CourseProgress.model';
import CourseTag from './CourseTag.model';
import Enrollment from './Enrollment.model';
import Feedback from './Feedback.model';
import ForumGroup from './Forum.model';
import Group from './Group.model';
import Lesson from './Lesson.model';
import Notification from './Notification.model';
import Question from './Question.model';
import Quiz from './Quiz.model';
import Resource from './Resource.model';
import Tag from './Tag.model';
import User from './User.model';
import UserActivity from './UserActivity.model';
import Attachment from './Attachment.model';

export {
  Course,
  CourseProgress,
  CourseTag,
  Tag,
  Answer,
  Enrollment,
  Feedback,
  ForumGroup,
  Group,
  Lesson,
  Notification,
  Question,
  Quiz,
  Resource,
  User,
  UserActivity,
  Attachment,
};

Lesson.hasMany(Attachment, {
  as: 'attachments',
  foreignKey: 'lessonId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Course.hasMany(Feedback, {
  as: 'feedbacks',
  foreignKey: 'courseId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Feedback.belongsTo(Course, {
  as: 'course_feedbacks',
  foreignKey: 'courseId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Question.hasMany(Answer, {
  as: 'answers',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'questionId',
});

User.hasMany(CourseProgress, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

CourseProgress.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Course.hasMany(CourseProgress, {
  foreignKey: 'courseId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

CourseProgress.belongsTo(Course, {
  foreignKey: 'courseId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

Lesson.hasMany(CourseProgress, {
  foreignKey: 'lessonId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

CourseProgress.belongsTo(Lesson, {
  foreignKey: 'lessonId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});

User.hasMany(Enrollment, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'enrollments',
});

Enrollment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'enrolledBy',
});

Course.hasMany(Enrollment, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'enrollments',
  foreignKey: 'courseId',
});

Course.belongsTo(User, {
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'enrolled_at',
  foreignKey: 'courseId',
});

ForumGroup.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'users',
});

Group.belongsTo(User, {
  foreignKey: 'createdBy',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'user_group',
});

User.hasMany(Group, {
  foreignKey: 'createdBy',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'user_groups',
});

Course.hasMany(Group, {
  foreignKey: 'courseId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'course_groups',
});

Group.belongsTo(Course, {
  foreignKey: 'courseId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'course_group',
});

Course.hasMany(Lesson, {
  as: 'lessons',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'courseId',
});

Quiz.hasMany(Question, {
  as: 'questions',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'quizId',
});

Course.hasMany(Quiz, {
  as: 'quizzies',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'courseId',
});

Course.hasMany(Resource, {
  as: 'resources',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'courseId',
});

Tag.belongsToMany(Course, {
  through: CourseTag,
  as: 'tagCourses',
});

Course.belongsToMany(Tag, {
  through: CourseTag,
  as: 'courseTags',
});

User.hasMany(Notification, {
  as: 'notifications',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'userId',
});

User.hasMany(Course, {
  foreignKey: 'createdBy',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  as: 'courses',
});

User.hasMany(UserActivity, {
  as: 'activities',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  foreignKey: 'userId',
});

Feedback.belongsTo(User, {
  as: 'user_feedbacks',
  foreignKey: 'userId',
  onDelete: 'cascade',
  onUpdate: 'cascade',
});
