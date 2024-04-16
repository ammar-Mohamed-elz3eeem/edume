import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('pdf', 'image', 'video'),
    allowNull: false,
    defaultValue: 'image',
  },
  lessonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Lessons', key: 'id' },
  },
});

export default Attachment;
