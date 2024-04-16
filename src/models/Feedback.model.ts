import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import Course from './Course.model';

const Feedback = sequelize.define(
  'Feedback',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    comment: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: true,
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: 'id' },
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: 'id' },
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    createdAt: true,
    updatedAt: false,
    indexes: [{ fields: ['courseId', 'userId'], unique: true }],
  },
);

export default Feedback;
