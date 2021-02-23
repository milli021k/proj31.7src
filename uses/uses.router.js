const router = require("express").Router();
const controller = require("./uses.controler");

const methodNotAllowed = require("../middleware/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:useId")
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
