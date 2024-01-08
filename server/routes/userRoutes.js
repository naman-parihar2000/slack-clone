const express = require("express");
const authenticate = require("./authMiddleware.js");
const router = express.Router();

router.get("/", authenticate, (req, res) => {
  setTimeout(() => {
    res.status(200).json({ success: true, data: req.user, status: 200 });
  }, 2000);
});

module.exports = router;
