import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './userModel'; // Import the User model

class Patient extends Model {
  public id!: number;
  public name!: string;
  public dob!: Date;
  public contact!: string;
  public doctorId!: number;
}

Patient.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the related table (in lowercase, plural)
        key: 'id', // Primary key in the Users table
      },
    },
  },
  {
    sequelize,
    modelName: 'Patient',
  }
);

// Define the relationship between Patient and User (Doctor)
Patient.belongsTo(User, { foreignKey: 'doctorId' }); // Patient belongs to a User (Doctor)
export default Patient;
