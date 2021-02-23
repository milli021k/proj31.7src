const router = require("express").Router();
const controller = require("./url.controler");
const usesControler = require("../uses/uses.controler");

const methodNotAllowed = require("../middleware/methodNotAllowed");

// routes
router
  .route("/")
  .get(controller.list)
  .post(controller.create)

  .all(methodNotAllowed);

router
  .route("/:urlId/uses")
  .get(controller.urlExists, usesControler.list)
  .all(methodNotAllowed);

router
  .route("/:urlId")
  .get(controller.read)
  .put(controller.update)
  //.delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/:urlId/uses/:useId")
  .get(controller.urlExists, usesControler.read)
  .delete(controller.urlExists, usesControler.delete)
  .all(methodNotAllowed);

module.exports = router;
