const express = require('express');
const bb = require('express-busboy')
const Controller = require('../controllers/updateProfile.controller');

const app = express.Router();

app.patch('/update', Controller.updateProfile)


bb.extend(app, {
  upload: true,
  path: 'uploads',
  allowedPath: /./
});

app.patch('/uploadProfileImage', Controller.updateProfileImage)

module.exports = app;