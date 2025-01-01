import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Task extends Model {
  public id!: number;
  public description!: string;
  public deadline!: Date;
  public assignedTo!: string[]; // Array of assigned user names
}

Task.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Store an array of user names
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Task',
  }
);

export default Task;
