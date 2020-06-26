const { body, param } = require("express-validator");

module.exports = {
  createValidation: [
    body("name").trim().isString().notEmpty(),
    body("population").isNumeric().notEmpty(),
    body("lat").isNumeric().notEmpty(),
    body("long").isNumeric().notEmpty(),
  ],
  getSingleValidation: [param("id").isMongoId()],
};
