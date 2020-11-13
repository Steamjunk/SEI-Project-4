'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('card_colors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_id: {
        type: Sequelize.STRING
      },
      color_id: {
        type: Sequelize.INTEGER
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
    },
    {
      uniqueKeys: {
        actions_unique: {
          fields: ['card_id', 'color_id']
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('card_colors');
  }
};