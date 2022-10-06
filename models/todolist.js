"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todolist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todolist.belongsTo(models.Activity, { foreignKey: "activityID" });
    }
  }
  Todolist.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Todolist Title is Required" },
          notNull: { msg: "Todolist Title is Required" },
        },
      },
      status: {
        type: DataTypes.ENUM("On Progress", "Complete"),
        allowNull: false,
        defaultValue: "On Progress",
        validate: {
          isIn: {
            args: [["On Progress", "Complete"]],
            msg: "Invalid Status",
          },
        },
      },
      priority: {
        type: DataTypes.ENUM("Very High", "High", "Medium", "Low", "Very Low"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["Very High", "High", "Medium", "Low", "Very Low"]],
            msg: "Invalid Priority",
          },
        },
      },
      activityID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todolist",
    }
  );
  return Todolist;
};
