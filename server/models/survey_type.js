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
      survey_type.hasMany(models.survey, {
        foreignKey: 'survey_type_id',
        as: 'surveys', 
      });
    }
  }
  survey_type.init({
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
    name: {type:DataTypes.STRING,allowNull:false},
    abbr: {type:DataTypes.STRING, allowNull:false},
  }, {
    sequelize,
    modelName: 'survey_type',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt:"deleted_at"
  });
  return survey_type;
};