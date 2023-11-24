const router = require("express").Router();
const {
  getAllContactInfo,
  getOneContactInfo,
  updateContactInfo,
  createContactInfo,
  deleteContactInfo,
} = require("../controllers/contactInfo.controller");
const { checkAuthUser, checkAdminCompanyOrUser } = require("../middleware");

router.get("/", getAllContactInfo);
router.get("/:contactInfo_id", getOneContactInfo);
router.put(
  "/:contactInfo_id",
  checkAuthUser,
  updateContactInfo
);
router.post("/",checkAuthUser,  createContactInfo);
//checkadmuserorcompany, me da error, solo con el checkauth puedo entrar como admin, sin embargo el middelware que me comprueba que es admin me da error
router.delete(
  "/:contactInfo_id",
  checkAuthUser,
  checkAdminCompanyOrUser,
  deleteContactInfo
);

module.exports = router;
