const express = require("express");
const Controller = require("../controllers/categories.controller")

const app = express.Router();

app.get('/categories', Controller.getCategories );


module.exports = app;