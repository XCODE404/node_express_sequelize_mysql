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
      models.Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      models.Product.belongsTo(models.SubCategory, { foreignKey: 'sub_category_id', as: 'subcategory' });
      models.Product.hasMany(models.OrderDetail, { foreignKey: 'product_id', as: 'order_detail' })
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
      type: DataTypes.UUID,
      references: {
        model: 'subcategory',
        key: 'sub_category_id'
      }
    },
    product_no: {
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      defaultValue: 0.00,
      type: DataTypes.DECIMAL
    },
    quantity: {
      allowNull: false,
      defaultValue: 0.00,
      type: DataTypes.DECIMAL
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
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
    updated_agent: {
      type: DataTypes.JSON
    },
    updated_date: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'Product',
    createdAt: false,
    updatedAt: false,
    hooks: {
      beforeCreate: async (product, options) => {
        const prefix = 'PROD';
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const count = await Product.count();
        const uniqueIdentifier = String(count + 1).padStart(4, '0');

        product.product_no = `${ prefix }-${ date }-${ uniqueIdentifier }`;
      }
    }
  });
  return Product;
};