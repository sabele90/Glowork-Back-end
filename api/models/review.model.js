const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Review = sequelize.define("review", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo_review: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  offer_id: {
    type: DataTypes.INTEGER,
  },
  company_id: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    field: "created_at", // Cambia el nombre de la columna createdAt
    type: DataTypes.DATE,
    defaultValue: function () {
      return new Date();
    },
  },
  updatedAt: {
    field: "updated_at", // Cambia el nombre de la columna updatedAt
    type: DataTypes.DATE,
    defaultValue: function () {
      return new Date();
    },
  },
});

module.exports = Review;
