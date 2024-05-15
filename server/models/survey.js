'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  survey.init({
    survey_type_id: DataTypes.INTEGER,
    name: DataTypes.TEXT,
    abbr: DataTypes.STRING,
    is_published: DataTypes.BOOLEAN,
    options: DataTypes.JSON,
    published_at: DataTypes.DATE,
    publication_status_changed_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'survey',
  });
  return survey;
};