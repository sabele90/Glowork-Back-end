const router = require("express").Router();
const {
  getAllNationality,
  getOneNationality,
  updateNationality,
  createNationality,
  deleteNationality,
} = require("../controllers/nacionality.controller");
const { checkAuthUser, checkAdminCompanyOrUser } = require("../middleware");

router.get("/", getAllNationality);
router.get("/:nationality_id", getOneNationality);
router.put(
  "/:nationality_id",
  checkAuthUser,

  updateNationality
);
router.post("/", checkAuthUser, checkAdminCompanyOrUser, createNationality);
router.delete(
  "/:nationality_id",
  checkAuthUser,
  checkAdminCompanyOrUser,
  deleteNationality
);

module.exports = router;
