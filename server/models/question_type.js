'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  question_type.init({
    name: DataTypes.STRING,
    abbr: DataTypes.STRING,
    deleted_at: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'question_type',
  });
  return question_type;
};