'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Employee.belongsTo(models.MstRole, { foreignKey: 'role_id', as: 'mst_role' });
    }
  }
  Employee.init({
    employee_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    role_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'mstrole',
        key: 'role_id'
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date_of_joining: {
      allowNull: false,
      type: DataTypes.DATE
    },
    profile_image: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    del_flg: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_agent: {
      type: DataTypes.JSON
    },
    created_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_agent: {
      type: DataTypes.JSON
    },
    updated_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Employee',
    createdAt: false,
    updatedAt: false
  });
  return Employee;
};