'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  survey_type.init({
    name: {type:DataTypes.STRING,allowNull:false},
    abbr: {type:DataTypes.STRING, allowNull:false},
  }, {
    sequelize,
    modelName: 'survey_type',
  });
  return survey_type;
};