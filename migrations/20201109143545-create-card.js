'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      multiverseId: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      manaCost: {
        type: Sequelize.STRING
      },
      cmc: {
        type: Sequelize.INTEGER
      },
      rarity: {
        type: Sequelize.STRING
      },
      setName: {
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
      imageUrl: {
        type: Sequelize.TEXT
      },
      foil: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cards');
  }
};