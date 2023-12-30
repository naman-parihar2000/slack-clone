const express = require("express");
const router = express.Router();
const passport = require("../utils/Passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/workspace",
    failureRedirect: "/login",
  })
);

module.exports = router;
