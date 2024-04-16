import sequelize from '@/db';
import { DataTypes } from 'sequelize';
import Question from './Question.model';

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: { model: Question, key: 'id' },
    allowNull: false,
  },
});

export default Answer;
