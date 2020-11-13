'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      multiverse_id: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      mana_cost: {
        type: Sequelize.STRING
      },
      cmc: {
        type: Sequelize.INTEGER
      },
      rarity: {
        type: Sequelize.STRING
      },
      set_name: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      flavor: {
        type: Sequelize.TEXT
      },
      artist: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.STRING
      },
      toughness: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.TEXT
      },
      foil: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('cards');
  }
};