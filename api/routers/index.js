const router = require("express").Router();

router.use("/user", require("./user.router.js"));
router.use("/review", require("./review.router.js"));
router.use("/offer", require("./offer.router.js"));
router.use("/nationality", require("./nationality.router.js"));
router.use("/favorites", require("./favorites.router.js"));
router.use("/country", require("./country.router.js"));
router.use("/continent", require("./continent.router.js"));
router.use("/contactInfo", require("./contactInfo.router.js"));
router.use("/company", require("./company.router.js"));
router.use("/auth", require("./auth.router.js"));
module.exports = router;
