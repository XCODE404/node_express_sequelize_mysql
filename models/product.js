'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    category_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'category',
        key: 'category_id'
      }
    },
    sub_category_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'subcategory',
        key: 'sub_category_id'
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.STRING
    },
    price: {
      default: 0.00,
      type: DataTypes.DECIMAL
    },
    quantity: {
      default: 0.00,
      type: DataTypes.DECIMAL
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      default: 'active'
    },
    description: {
      type: DataTypes.STRING
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
    modelName: 'Product',
    createdAt: false,
    updatedAt: false
  });
  return Product;
};