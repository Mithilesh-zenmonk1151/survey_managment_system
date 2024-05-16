"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      survey.belongsTo(models.survey_type, {
        foreignKey: 'survey_type_id',
        as: 'survey_type', 
      });
      survey.belongsToMany(models.question, {
        through: models.survey_question,
        foreignKey: 'survey_id',
        otherKey: 'question_id',
        as: 'questions'
      });
    }
  }
  survey.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      survey_type_id: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.TEXT, allowNull: false },
      abbr: { type: DataTypes.STRING, allowNull: false },
      is_published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      options: { type: DataTypes.JSON, allowNull: false },
      published_at: { type: DataTypes.DATE },
      publication_status_changed_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "survey",
      // createdAt: 'created_at',
      // updatedAt: 'updated_at',
      deletedAt:"deleted_at"
    }
  );
  return survey;
};
