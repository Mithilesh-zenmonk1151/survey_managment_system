"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class question_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      question_type.hasMany(models.question,{
        foreignKey:"question_type_id",
        as:"questions"
      })
    }
  }
  question_type.init(
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
      name: { type: DataTypes.STRING, allowNull: false },
      abbr: { type: DataTypes.STRING, allowNull: false },
      deleted_at: DataTypes.TIME,
      // updated_at: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "question_type",
      // createdAt: 'created_at',
      // updatedAt: 'updated_at',
      deletedAt:"deleted_at"
      
    }
  );
  return question_type;
};



