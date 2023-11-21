const router = require("express").Router();

const {
  getAllCompany,
  getOneCompany,
  updateCompany,
  createCompany,
  deleteCompany,
} = require("../controllers/company.controller");
const { checkAuthCompany, checkAdminCompanyOrUser } = require("../middleware");

router.get("/", getAllCompany);
router.get("/:company_id", getOneCompany);
router.put(
  "/:company_id",
  checkAuthCompany,
  checkAdminCompanyOrUser,
  updateCompany
);
router.post("/", createCompany);
router.delete("/:company_id", deleteCompany);

module.exports = router;
