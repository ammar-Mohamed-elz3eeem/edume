import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const Resource = sequelize.define(
  'Resource',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('video', 'pdf', 'article', 'image'),
      defaultValue: 'article',
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true },
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: { model: 'Courses', key: 'id' },
      allowNull: false,
    },
  },
  { createdAt: false, updatedAt: false },
);

export default Resource;
