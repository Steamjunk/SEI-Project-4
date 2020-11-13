'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rulings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_id: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rulings');
  }
};