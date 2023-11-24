const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Favorites = sequelize.define(
  "favorites",
  {
    offer_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Favorites;
