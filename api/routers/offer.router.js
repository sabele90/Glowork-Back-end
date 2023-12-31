const router = require("express").Router();
const {
  getAllOffer,
  getOneOffer,
  updateOffer,
  createOffer,
  deleteOffer,
  getUserFavoritesOffers,
  offerSetUser
} = require("../controllers/offer.controller");
const {
  checkAuthCompany,
  checkAdminCompanyOrUser,
  checkAuthUser,
} = require("../middleware");
router.get("/", getAllOffer);

router.get("/user/user_id/favorites",getUserFavoritesOffers);

router.get("/:offer_id", getOneOffer);
router.get("/offerSetUser/:offer_id", checkAuthUser, offerSetUser);
router.put(
  "/:offer_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  updateOffer
);
router.post("/", checkAuthCompany, checkAdminCompanyOrUser, createOffer);
router.delete(
  "/:user_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  deleteOffer
);

module.exports = router;
