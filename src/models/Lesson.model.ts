import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: { model: 'Courses', key: 'id' },
    allowNull: false,
  },
});

export default Lesson;
