const express = require("express");
const authenticate = require("./authMiddleware.js");
const router = express.Router();
const AWS = require("../utils/AWS.js");
const s3 = new AWS.S3();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", authenticate, (req, res) => {
  setTimeout(() => {
    res.status(200).json({ success: true, data: req.user, status: 200 });
  }, 5000);
});

router.post(
  "/image/upload",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    const fileName = `${req.user.googleId}_${Date.now()}`;
    const { file } = req;

    const params = {
      Bucket: "slack-clone-user-data",
      Key: "user_profile_images/" + fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const uploaded = await s3.upload(params).promise();
      const imageUrl = uploaded.Location;
      res.status(200).json({ success: true, imageUrl });
    } catch (error) {
      console.log("Error:", error);
    }
  }
);

module.exports = router;
