const router = require("express").Router();
const {
  getAllReview,
  getOneReview,
  updateReview,
  createReview,
  deleteReview,
} = require("../controllers/review.controller");

const { checkAuthUser, checkAdminCompanyOrUser } = require("../middleware");

router.get("/", checkAuthUser, checkAdminCompanyOrUser, getAllReview);

router.get("/:review_id", checkAuthUser, checkAdminCompanyOrUser, getOneReview);

router.put("/:review_id", checkAuthUser, checkAdminCompanyOrUser, updateReview);

router.post("/", checkAuthUser, checkAdminCompanyOrUser, createReview);

router.delete(
  "/:review_id",
  checkAuthUser,
  checkAdminCompanyOrUser,
  deleteReview
);

module.exports = router;
