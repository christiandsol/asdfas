const { Router } = require("express");
const router = Router();
const { body } = require("express-validator");
const userControllers = require("../controllers/user-controllers");

router.get("/", userControllers.getUsers);
router.get("/:uid", userControllers.getUserDecors);
router.post(
  "/sign-up",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  userControllers.postSignUp
);

router.post("/log-in", userControllers.postLogIn);

module.exports = router;
