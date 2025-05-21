const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db_conection/index");

const Review = sequelize.define("review", {
  profile_photo: {
    type: DataTypes.STRING,
  },
  comment: {
    type: DataTypes.TEXT,
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
    allowNull: false, // ← Opcional pero recomendable si es obligatorio
  },
  offer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
});

module.exports = Review;
