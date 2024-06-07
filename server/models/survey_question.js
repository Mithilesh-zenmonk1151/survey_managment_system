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
      survey_question.belongsTo(models.survey, {
        foreignKey: 'survey_id',
        onDelete: 'CASCADE'
      });
    
      survey_question.belongsTo(models.question, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE'
      });
    }
  }
  survey_question.init({
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
    survey_id: {type:DataTypes.INTEGER,allowNull:false},
    question_id: {type:DataTypes.INTEGER,allowNull:false},
    order: DataTypes.INTEGER,
    
    question_description: {type:DataTypes.TEXT,
      allowNull:false},
    deleted_at: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'survey_question',
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    deletedAt:"deleted_at"
  });
  return survey_question;
};

