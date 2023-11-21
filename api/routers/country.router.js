const router = require("express").Router();
const {
  getAllCountry,
  getOneCountry,
  updateCountry,
  createCountry,
  deleteCountry,
} = require("../controllers/country.controller");
const { checkAuthCompany, checkAdminCompanyOrUser } = require("../middleware");

router.get("/", getAllCountry);
router.get("/:country_id", getOneCountry);
router.put(
  "/:country_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  updateCountry
);
router.post("/", checkAuthCompany, checkAdminCompanyOrUser, createCountry);
router.delete(
  "/:country_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  deleteCountry
);

module.exports = router;
