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
    type: DataTypes.ENUM("user", "company", "admin"),
    defaultValue: "user",
  },
}, {
  timestamps: true,
  underscored: true, // crea columnas created_at, updated_at automáticamente
});

module.exports = User;
