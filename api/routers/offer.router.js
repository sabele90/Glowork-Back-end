const router = require("express").Router();
const {
  getAllOffer,
  getOneOffer,
  updateOffer,
  createOffer,
  deleteOffer,
} = require("../controllers/offer.controller");
const {
  checkAuthCompany,
  checkAdminCompanyOrUser,
  checkAuthUser,
} = require("../middleware");
router.get("/", getAllOffer);

router.get("/user/user_id/favorites");

router.get("/:offer_id", getOneOffer);
router.get("/offerSetUser/:offer_id", checkAuthUser);
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
