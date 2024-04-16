import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import User from './User.model';
import Course from './Course.model';
import Lesson from './Lesson.model';

const CourseProgress = sequelize.define(
  'CourseProgress',
  {
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: 'id' },
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      references: { model: Lesson, key: 'id' },
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    progressPercentage: {
      type: DataTypes.FLOAT,
      validate: { min: 0, max: 100 },
    },
    lastAccessedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    indexes: [{ fields: ['userId', 'courseId', 'lessonId'], unique: true }],
  },
);

export default CourseProgress;
