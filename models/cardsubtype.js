'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card_subtype extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  card_subtype.init({
    card_id: DataTypes.STRING,
    subtype_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'card_subtype',
  });
  return card_subtype;
};