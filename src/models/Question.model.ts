import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import Quiz from './Quiz.model';

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quizId: {
    type: DataTypes.INTEGER,
    references: { model: Quiz, key: 'id' },
    allowNull: false,
  },
});

export default Question;
