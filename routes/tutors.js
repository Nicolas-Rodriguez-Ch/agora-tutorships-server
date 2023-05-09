const express = require("express");
const Controller = require("../controllers/tutors.controller")

const app = express.Router();

app.get('/tutors/:subject/', Controller.getTutors );


module.exports = app;