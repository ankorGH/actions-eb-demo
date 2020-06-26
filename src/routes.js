const router = require("express").Router();
const communityRoutes = require("./community/community.route");

router.use("/community", communityRoutes);

module.exports = router;
