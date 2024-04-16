import sequelize from '@/db';
import { DataTypes } from 'sequelize';

const Tag = sequelize.define(
  'Tag',
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
  },
  { createdAt: false, updatedAt: false },
);

export default Tag;
