'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MstRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.MstRole.hasMany(models.Employee, { foreignKey: 'role_id', as: 'employee' });
    }
  }
  MstRole.init({
    role_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      unique: true,
      type: DataTypes.STRING
    },
    del_flg: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    create_agent: {
      type: DataTypes.JSON
    },
    created_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    update_agent: {
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
    modelName: 'MstRole',
    createdAt: false,
    updatedAt: false
  });
  return MstRole;
};