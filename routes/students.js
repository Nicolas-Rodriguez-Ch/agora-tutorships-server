const express = require("express");
const Controller = require("../controllers/students.controller.js")

const app = express.Router();

app.get('/students/:id', Controller.getStudents );


module.exports = app;