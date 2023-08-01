'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customer', {
      customer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_of_opening: {
        allowNull: false,
        type: Sequelize.DATE
      },
      profile_image: {
        type: Sequelize.STRING
      },
      address: {
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
      updated_agent: {
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
    await queryInterface.dropTable('Customer');
  }
};