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
router.get("/:offer_id", getOneOffer);
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
