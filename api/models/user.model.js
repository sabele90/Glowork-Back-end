const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const User = sequelize.define("user", {
  profile_photo: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
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
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  interests: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  contact_info_id: {
    type: DataTypes.INTEGER,
  },

  role: {
    type: DataTypes.ENUM("user", "company", "admin"), // Enumera los roles disponibles
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

module.exports = User;
