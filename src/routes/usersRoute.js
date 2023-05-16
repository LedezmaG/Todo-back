const { Router } = require("express");
const { check } = require("express-validator");
const { JwtVerify } = require("../helpers/jwtVerify");
const { fileValidator } = require("../helpers/fileValidator");
const { GetAll, GetById, Create, Update, Delete } = require("../controllers/UsersController.js");

const router = Router();
router.use(JwtVerify);

router.get(
  "/",
  [
    check("limit", "Invalid value").optional().isInt(),
    check("offset", "Invalid value").optional().isInt(), 
    fileValidator
  ],
  GetAll
);

router.get(
  "/:id",
  [
    check("id", "id no es valido").isInt(), 
    check("limit", "Invalid value").optional().isInt(),
    check("offset", "Invalid value").optional().isInt(), 
    fileValidator
  ],
  GetById
);

router.post(
  "/",
  [
    check("id_role", "Invalid value").isInt(),
    check("name", "Invalid value").isString().isLength({ max: 20 }),
    check("username", "Invalid value").isString().isLength({ max: 20 }),
    fileValidator,
  ],
  Create
);

router.put(
  "/",
  [
    check("id", "Invalid value").isInt(),
    check("id_role", "Invalid value").isInt(),
    check("name", "Invalid value").isString().isLength({ max: 20 }),
    check("username", "Invalid value").isString().isLength({ max: 20 }),
    fileValidator,
  ],
  Update
);

router.delete(
  "/:id",
  [
    check("id", "id no es valido").isInt(), 
    fileValidator
  ],
  Delete
);

module.exports = router;
