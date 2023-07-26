'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderDetail', {
      order_detail_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      order_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'order',
          key: 'order_id'
        }
      },
      item: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'product',
          key: 'product_id'
        }
      },
      quantity: {
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      price: {
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      discount: {
        default: 0.00,
        type: Sequelize.DECIMAL
      },
      del_flg: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_agent: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('OrderDetail');
  }
};