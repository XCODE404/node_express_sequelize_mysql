'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
    }
  }
  Category.init({
    category_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    del_flg: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_employee: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'employee',
        key: 'employee_id'
      }
    },
    created_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_agent: {
      type: DataTypes.JSON
    },
    updated_employee: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'employee',
        key: 'employee_id'
      }
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
    modelName: 'Category',
    createdAt: false,
    updatedAt: false
  });
  return Category;
};