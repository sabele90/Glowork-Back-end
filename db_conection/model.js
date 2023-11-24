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
    //ONE TO ONE
    //USER
    User.hasOne(ContactInfo, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    ContactInfo.belongsTo(User, { foreignKey: "user_id" });

/*     ContactInfo.hasOne(Nationality, {
      foreignKey: "contact_info_id", //antes user_id
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Nationality.belongsTo(ContactInfo, { foreignKey: "user_id" }); */

    Nationality.hasMany(ContactInfo);
    ContactInfo.belongsTo(Nationality);



    //COMPANY
    Company.hasOne(Country, {
      foreignKey: "company_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Country.belongsTo(Company, { foreignKey: "company_id" });

    //ONE TO MANY
    //USER
    User.hasMany(Favorites, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Favorites.belongsTo(User, { foreignKey: "user_id" });

    Offer.hasMany(Favorites, {
      foreignKey: "offer_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
    Favorites.belongsTo(Offer, {foreignKey: "offer_id"})

    User.hasMany(Review, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Review.belongsTo(User, { foreignKey: "user_id" });

    //COMPANY

    Company.hasMany(Offer, {
      foreignKey: "company_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Offer.belongsTo(Company, { foreignKey: "company_id" });
    //company  o contient ??? join company with continent[]
    Company.hasMany(Continent, {
      foreignKey: "company_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Continent.belongsTo(Company, { foreignKey: "company_id" });

    //MANY TO MANY
    Offer.belongsToMany(User, { through: "job_offer_user" });
    User.belongsToMany(Offer, { through: "job_offer_user" });

    console.log("Relations added to all models");
  } catch (error) {
    throw error;
  }
}
module.exports = addRelationsToModels;
