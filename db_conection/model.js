const Company = require("../api/models/company.model");
const ContactInfo = require("../api/models/contactInfo.model");
const Continent = require("../api/models/continent.model");
const Country = require("../api/models/country.model");
const Favorites = require("../api/models/favorites.model");
const Nationality = require("../api/models/nationality.model");
const Offer = require("../api/models/offer.model");
const Review = require("../api/models/review.model");
const User = require("../api/models/user.model");

function addRelationsToModels() {
  try {
    // --- ONE TO ONE ---
    // USER → CONTACT INFO
    User.hasOne(ContactInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    ContactInfo.belongsTo(User, { foreignKey: "user_id" });

    // CONTACT INFO → NATIONALITY
    Nationality.hasMany(ContactInfo, { foreignKey: "nationality_id" });
    ContactInfo.belongsTo(Nationality, { foreignKey: "nationality_id" });

    // --- ONE TO MANY ---
    // COUNTRY → CONTINENT
    Continent.hasMany(Country, { foreignKey: "continent_id" });
    Country.belongsTo(Continent, { foreignKey: "continent_id" });

    // USER → FAVORITES
    User.hasMany(Favorites, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Favorites.belongsTo(User, { foreignKey: "user_id" });

    // OFFER → FAVORITES
    Offer.hasMany(Favorites, {
      foreignKey: "offer_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Favorites.belongsTo(Offer, { foreignKey: "offer_id" });

    // USER → REVIEWS
    User.hasMany(Review, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Review.belongsTo(User, { foreignKey: "user_id" });

    // COMPANY → OFFERS
    Company.hasMany(Offer, {
      foreignKey: "company_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Offer.belongsTo(Company, { foreignKey: "company_id" });

    // --- MANY TO MANY ---
    // COMPANY ↔ COUNTRY
    Company.belongsToMany(Country, { through: "company_country" });
    Country.belongsToMany(Company, { through: "company_country" });

    // USER ↔ OFFER
    Offer.belongsToMany(User, { through: "job_offer_user" });
    User.belongsToMany(Offer, { through: "job_offer_user" });

    console.log(" Relations added to all models");
  } catch (error) {
    console.error(" Error adding relations:", error);
    throw error;
  }
}

module.exports = addRelationsToModels;
