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
      // define association here
    }
  }
  survey.init(
    {
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
    }
  );
  return survey;
};
