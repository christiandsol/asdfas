const { Router } = require("express");
const router = Router();
const { body } = require("express-validator");

const decorControllers = require("../controllers/decor-controllers");
const checkAuth = require("../middlewear/check-auth");
router.get("/:pid", decorControllers.getDecors);

// title, url, price, image
router.use(checkAuth);

router.patch(
  "/:pid",
  [
    body("title").not().isEmpty(),
    body("description").isLength({ min: 15 }),
    body("url").isLength({ min: 7 }),
    body("price").isNumeric(),
    body("image"),
  ],
  decorControllers.updateDecorByID
);
router.post(
  "/",
  [
    body("title").not().isEmpty(),
    body("description").isLength({ min: 15 }),
    body("url").isLength({ min: 7 }),
    body("price").isNumeric(),
    body("image").not().isEmpty(),
  ],
  decorControllers.postDecor
);

router.delete("/:pid", decorControllers.deleteDecor);

module.exports = router;
