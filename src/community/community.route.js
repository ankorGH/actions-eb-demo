const router = require("express").Router();
const {
  createValidation,
  getSingleValidation,
} = require("./community.validation");
const { create, getSingle } = require("./community.controller");

router.post("/", createValidation, create);
router.get("/:id", getSingleValidation, getSingle);

module.exports = router;
