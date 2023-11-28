const Offer = require("../models/offer.model");
const Company = require("../models/company.model");
const Favorites = require("../models/favorites.model");
const User = require("../models/user.model");

async function getAllOffer(req, res) {
  try {
    const offers = await Offer.findAll({
      include: [
        {
          model: Company,
        },
      ],
    });

    return res.status(200).json(offers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOneOffer(req, res) {
  try {
    const offer = await Offer.findByPk(req.params.offer_id);
    if (offer) {
      return res.status(200).json(offer);
    } else {
      return res.status(404).send("Offer not found");
    }
  } catch (error) {
    res.status(200).send(error.message);
  }
}

async function getUserFavoritesOffers (req,res) {
  try{
    const userId = req.params.userId
    const favorites = await Favorites.findAll({
      where: {
        userr_id :userId
      }
    })
    const favoritesOffersId = favorites.map((favorite )=> favorite.offer_id)
    const FavoriteOffers = await Offer.findAll({
      include: [
        {
          model: Company
        }
      ]
    })
    const favoriteUserOffers = favoriteOffers.filter((offer) => favoritesOffersId.includes(offer.id))
  return res.status(200).json(favoriteUserOffers);
} catch (error) {
res.status(500).send(error.message);
}
}


async function createOffer(req, res) {
  try {
    const offer = await Offer.create(req.body);
    return res.status(200).json({
      message: "Offer created",
      offer: offer,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateOffer(req, res) {
  try {
    const [offerExist, offer] = await Offer.update(req.body, {
      returning: true,
      where: {
        id: req.params.offer_id,
      },
    });
    if (offerExist !== 0) {
      return res.status(200).json({
        message: "Offer updated",
        offer: offer,
      });
    } else {
      return res.status(404).send("Offer not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteOffer(req, res) {
  try {
    const offer = await Offer.destroy({
      where: {
        id: req.params.offer_id,
      },
    });
    if (offer) {
      return res.status(200).json("Offer deleted");
    } else {
      return res.status(404).send("Offer not found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function offerSetUser(req, res) {
  try {
    const offer = await Offer.findByPk(req.params.offer_id);
    const user = await User.findByPk(res.locals.user.id);
    const result = await offer.addUser(user);
    return res.status(200).json({
      message: "Offer assigned",
      offer: offer,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getAllOffer,
  getOneOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  offerSetUser,
  getUserFavoritesOffers,
};
