const router = require("express").Router();
const {
  getAllContinent,
  getOneContinent,
  updateContinent,
  createContinent,
  deleteContinent,
} = require("../controllers/continent.controller");
const {
  checkAuthCompany,

  checkAdminCompanyOrUser,
} = require("../middleware");

router.get("/", getAllContinent);
router.get("/:continent_id", getOneContinent);
router.put(
  "/:continent_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  updateContinent
);
router.post("/", checkAuthCompany, checkAdminCompanyOrUser, createContinent);
router.delete(
  "/:continent_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  deleteContinent
);

module.exports = router;
