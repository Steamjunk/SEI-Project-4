'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Supertypes', [
      {
        supertype: "Legendary"
      },
      {
        supertype: "Basic"
      },
      {
        supertype: "Elite"
      },
      {
        supertype: "Host"
      },
      {
        supertype: "Ongoing"
      },
      {
        supertype: "Snow"
      },
      {
        supertype: "World"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Supertypes', null, {});
  }
};
