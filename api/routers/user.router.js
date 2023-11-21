const router = require("express").Router();
const {
  checkAuthUser,
  checkEmail,
  checkPassword,
  checkAdminCompanyOrUser,
} = require("../middleware/index");
const {
  getAllUser,
  getOneUser,
  updateUser,
  createUser,
  deleteUser,
  getUserContactInfo,
} = require("../controllers/user.controller");

router.get("/", getAllUser);

router.get("/:user_id/contactInfo", getUserContactInfo);

router.get("/:user_id", getOneUser);

router.put(
  "/:user_id",
  checkAuthUser,
  checkAdminCompanyOrUser,
  checkEmail,
  checkPassword,
  updateUser
);

router.post("/", checkAuthUser, checkEmail, checkPassword, createUser);
router.delete("/:user_id", checkAuthUser, checkAdminCompanyOrUser, deleteUser);

module.exports = router;
