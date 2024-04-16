import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: { model: 'Courses', key: 'id' },
    allowNull: false,
  },
});

export default Quiz;
