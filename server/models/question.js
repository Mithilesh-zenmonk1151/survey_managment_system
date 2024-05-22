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
      question.belongsToMany(models.survey, {
        through: models.survey_question,
        foreignKey: 'question_id',
        otherKey: 'survey_id',
        as: 'surveys'       
      });

      question.belongsTo(models.question_type,{
        foreignKey:"question_type_id",
        as:"question_type",
      });
      question.hasMany(models.survey_question, {
        foreignKey: 'question_id',
        onDelete: 'CASCADE'
      });

    }
  }
  question.init({
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
    question_type_id: {type:DataTypes.INTEGER,allowNull:false},
    description: {type:DataTypes.TEXT,allowNull:false},
    abbr: {type:DataTypes.STRING,allowNull:false},
    active: {type:DataTypes.BOOLEAN,allowNull:false},
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'question',
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    deletedAt:"deleted_at"
  });
  return question;
};