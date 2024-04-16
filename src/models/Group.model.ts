import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import User from './User.model';
import Course from './Course.model';

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: { model: Course, key: 'id' },
    allowNull: false,
  },
});

export default Group;
