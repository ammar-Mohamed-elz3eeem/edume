import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const CourseTag = sequelize.define(
  'CourseTag',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { createdAt: false, updatedAt: false },
);

export default CourseTag;
