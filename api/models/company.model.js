const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Company = sequelize.define("company", {
  profile_photo: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: {
        args: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        msg: "Error: Wrong email format.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("user", "company", "admin"), // Enumera los roles disponibles
    defaultValue: "company",
  },
  continent_id: {
    type: DataTypes.INTEGER,
  },
  country_id: {
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

module.exports = Company;
