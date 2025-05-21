const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Country = sequelize.define(
  "country",
  {
    country: {
      type: DataTypes.STRING,
    },
    continent_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = Country;
