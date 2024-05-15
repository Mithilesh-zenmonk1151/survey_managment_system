'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey_question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  survey_question.init({
    survey_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    question_description: DataTypes.TEXT,
    deleted_at: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'survey_question',
  });
  return survey_question;
};