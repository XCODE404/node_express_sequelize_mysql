'use strict';

const { v4: uuidv4 } = require('uuid');
const { ROLE } = require('../app/utils/constants');

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
        name: ROLE.ADMIN,
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        role_id: uuidv4(),
        name: ROLE.SUPERVISOR,
        created_date: new Date(),
        updated_date: new Date()
      },
      {
        role_id: uuidv4(),
        name: ROLE.STAFF,
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
    await queryInterface.bulkDelete('MstRole', null, {});
  }
};
