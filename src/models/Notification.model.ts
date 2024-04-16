import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import User from './User.model';

const Notification = sequelize.define(
  'Notification',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
      allowNull: false,
    },
  },
  { createdAt: true, updatedAt: false },
);

export default Notification;
