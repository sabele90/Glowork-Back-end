const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Nationality = sequelize.define("nationality", {
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = Nationality;
