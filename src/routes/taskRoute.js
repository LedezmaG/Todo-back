const { Router } = require("express");
const { check } = require("express-validator");
const { JwtVerify } = require("../helpers/jwtVerify");
const { fileValidator } = require("../helpers/fileValidator");
const { GetAll, GetById, Create, Update, Delete } = require("../controllers/TasksController");

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
    check("id_user", "Invalid value").isInt(),
    check("title", "Invalid value").isString().isLength({ max: 45 }),
    check("description", "Invalid value").isString().isLength({ max: 150 }),
    check("status", "Invalid value").isString().isIn(['open', 'waiting', 'done']),
    check("deadline", "Invalid value"),
    check("comment", "Invalid value").optional().isString().isLength({ max: 150 }),
    check("responsible", "Invalid value").optional().isString().isLength({ max: 45 }),
    check("tags", "Invalid value").optional().isString().isLength({ max: 150 }),
    fileValidator,
  ],
  Create
);

router.put(
  "/",
  [
    check("id", "Invalid value").isInt(),
    check("id_user", "Invalid value").isInt(),
    check("title", "Invalid value").isString().isLength({ max: 45 }),
    check("description", "Invalid value").isString().isLength({ max: 150 }),
    check("status", "Invalid value").isString().isIn(['open', 'waiting', 'done']),
    check("deadline", "Invalid value").isISO8601().toDate(),
    check("comment", "Invalid value").optional().isString().isLength({ max: 150 }),
    check("responsible", "Invalid value").optional().isString().isLength({ max: 45 }),
    check("tags", "Invalid value").optional().isString().isLength({ max: 150 }),
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
