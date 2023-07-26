'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product', {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      category_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'category',
          key: 'category_id'
        }
      },
      sub_category_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'subcategory',
          key: 'sub_category_id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      price: {
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      quantity: {
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        default: 'active'
      },
      description: {
        type: Sequelize.STRING
      },
      del_flg: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_employee: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'employee',
          key: 'employee_id'
        }
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_agent: {
        type: Sequelize.JSON
      },
      updated_employee: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'employee',
          key: 'employee_id'
        }
      },
      update_agent: {
        type: Sequelize.JSON
      },
      updated_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product');
  }
};