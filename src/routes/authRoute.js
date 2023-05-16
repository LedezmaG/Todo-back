const { Router } = require("express");
const { check } = require("express-validator");
const { fileValidator } = require("../helpers/fileValidator");
const { GenerateToken } = require("../controllers/AuthController");

const router = Router();

router.post(
  "/token",
  [
    check("username", "Invalid value").isString().isLength({ max: 20 }),
    fileValidator,
  ],
  GenerateToken
);

module.exports = router;
