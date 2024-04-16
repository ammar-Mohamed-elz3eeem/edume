import sequelize from '@/db';
import { DataTypes, Sequelize } from 'sequelize';
import User from './User.model';

const UserActivity = sequelize.define(
  'UserActivity',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
      allowNull: false,
    },
    activityType: {
      type: DataTypes.ENUM(
        'login',
        'course_enrollment',
        'course_completed',
        'quiz_completed',
      ),
    },
    activityDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  },
  { createdAt: false, updatedAt: false },
);

export default UserActivity;
