import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  featuredImage: {
    type: DataTypes.STRING,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' },
    allowNull: false,
  },
});

export default Course;
