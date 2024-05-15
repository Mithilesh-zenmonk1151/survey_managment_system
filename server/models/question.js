'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  question.init({
    question_type_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    abbr: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};