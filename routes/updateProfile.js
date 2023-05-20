const express = require("express");
const multer = require("multer");
const Controller = require("../controllers/updateProfile.controller");

const app = express.Router();
const upload = multer({ dest: "uploads/" });

app.patch("/update", Controller.updateProfile);

app.patch(
  "/uploadProfileImage",
  upload.single("image"),
  Controller.updateProfileImage
);

module.exports = app;
