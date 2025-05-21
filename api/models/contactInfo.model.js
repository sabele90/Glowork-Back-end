const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const ContactInfo = sequelize.define(
  "contact_info",
  {
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    nationality_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = ContactInfo;
