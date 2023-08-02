'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Order.init({
    order_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    customer_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    order_no: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    order_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    order_complete_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    order_status: {
      allowNull: false,
      type: DataTypes.ENUM('pending', 'completed', 'rejected'),
      defaultValue: 'pending'
    },
    del_flg: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'Order',
    createdAt: false,
    updatedAt: false,
    hooks: {
      beforeCreate: async (order, options) => {
        const prefix = 'ORD';
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const count = await Order.count();
        const uniqueIdentifier = String(count + 1).padStart(4, '0');

        order.order_no = `${ prefix }-${ date }-${ uniqueIdentifier }`;
      }
    }
  });
  return Order;
};