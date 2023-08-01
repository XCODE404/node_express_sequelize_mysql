'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  OrderDetail.init({
    order_detail_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    order_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'order',
        key: 'order_id'
      }
    },
    item: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    quantity: {
      default: 0.00,
      type: DataTypes.DECIMAL
    },
    price: {
      default: 0.00,
      type: DataTypes.DECIMAL
    },
    discount: {
      default: 0.00,
      type: DataTypes.DECIMAL
    },
    del_flg: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    created_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created_agent: {
      type: DataTypes.JSON
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
    modelName: 'OrderDetail',
    createdAt: false,
    updatedAt: false
  });
  return OrderDetail;
};