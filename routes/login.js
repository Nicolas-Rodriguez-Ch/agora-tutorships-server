const express = require('express');
const User = require('../controllers/user.controller');
const logger = require('../middlewares/logger');

const app = express.Router();

app.post('/login', logger);
app.get('/login', User.getUserData)

module.exports = app;