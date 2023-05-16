const { Router } = require("express");
const { check } = require("express-validator");
const { JwtVerify } = require("../helpers/jwtVerify");
const { fileValidator } = require("../helpers/fileValidator");
const { GetAll, GetById, Create, Update, Delete } = require("../controllers/RolesController");

const router = Router();
router.use(JwtVerify);

router.get("/", GetAll);

router.get(
  "/:id",
  [
    check("id", "id no es valido").isInt(), fileValidator
  ],
  GetById
);

router.post(
  "/",
  [
    check("name", "Invalid value").isString().isLength({ max: 20 }),
    check("description", "Invalid value").isString().isLength({ max: 50 }),
    fileValidator,
  ],
  Create
);

router.put(
  "/",
  [
      check("id", "Invalid value").isInt(),
      check("name", "Invalid value").isString().isLength({ max: 20 }),
      check("description", "Invalid value").isString().isLength({ max: 50 }),
      fileValidator,
  ],
  Update
);

router.delete(
  "/:id",
  [check("id", "id no es valido").isInt(), fileValidator],
  Delete
);

module.exports = router;
