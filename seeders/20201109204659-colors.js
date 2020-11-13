'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('colors', [
      {
        color: "White"
      },
      {
        color: "Blue"
      },
      {
        color: "Black"
      },
      {
        color: "Red"
      },
      {
        color: "Green"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colors', null, {});
  }
};
