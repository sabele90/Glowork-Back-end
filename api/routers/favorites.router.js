const router = require("express").Router();
const {
  getAllFavorites,
  getOneFavorites,
  updateFavorites,
  createFavorites,
  deleteFavorites,
} = require("../controllers/favorites.controller");
const { checkAuthUser, checkAdminCompanyOrUser } = require("../middleware");

router.get("/", checkAuthUser, checkAdminCompanyOrUser, getAllFavorites);
router.get(
  "/:favorites_id",
  checkAuthUser,
  checkAdminCompanyOrUser,
  getOneFavorites
);
router.put(
  "/:favorites_id",
  checkAuthUser,

  updateFavorites
);
router.post("/", checkAuthUser, checkAdminCompanyOrUser, createFavorites);
router.delete(
  "/:favorites_id",
  checkAuthUser,
  checkAdminCompanyOrUser,
  deleteFavorites
);

module.exports = router;
