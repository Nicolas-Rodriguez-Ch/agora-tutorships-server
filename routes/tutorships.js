const express = require("express");
const tutorshipController = require("../controllers/tutorship.controller");

const tutorship = express.Router();

tutorship.post("/tutorship", tutorshipController.createTutorship);
tutorship.get("/tutorships/:id", tutorshipController.getTutorships);
tutorship.get("/tutorship/:id", tutorshipController.getTutorship);

module.exports = tutorship;
