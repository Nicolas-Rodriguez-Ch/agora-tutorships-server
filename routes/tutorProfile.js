const express = require('express');
const tutorProfileController = require('../controllers/tutorProfile.controller');

const tutorProfile = express.Router();

tutorProfile.get('/tutor/:id', tutorProfileController.getTutorData);

module.exports = tutorProfile;
