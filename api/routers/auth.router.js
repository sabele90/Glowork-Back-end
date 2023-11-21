const router = require("express").Router();
const { checkPassword, checkEmail } = require("../middleware/index");
const jwt = require("jsonwebtoken");
const {
  signUpCompany,
  login,
  signUpUser,
} = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/signupCompany", checkPassword, checkEmail, signUpCompany);
router.post("/signupUser", checkPassword, checkEmail, signUpUser);

module.exports = router;
