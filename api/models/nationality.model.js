const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Nationality = sequelize.define(
  "nationality",
  {
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Nationality;
