import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import User from './User.model';

const ForumGroup = sequelize.define('ForumGroup', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
    allowNull: false,
  },
});

export default ForumGroup;
