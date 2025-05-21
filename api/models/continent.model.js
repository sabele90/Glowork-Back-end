const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Continent = sequelize.define(
  "continent",
  {
    continent: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Continent;
