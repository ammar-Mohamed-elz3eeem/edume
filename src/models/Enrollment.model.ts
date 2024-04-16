import sequelize from '@/db';
import { DataTypes, Sequelize } from 'sequelize';

const Enrollment = sequelize.define(
  'Enrollment',
  {
    enrollment_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    completion_date: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: { model: 'Courses', key: 'id' },
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    indexes: [{ fields: ['userId', 'courseId'], unique: true }],
  },
);

export default Enrollment;
