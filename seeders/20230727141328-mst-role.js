'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('MstRole', [
      {
        role_id: uuidv4(),
        name: 'admin',
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        role_id: uuidv4(),
        name: 'super',
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        role_id: uuidv4(),
        name: 'staff',
        created_date: new Date(),
        updated_date: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
