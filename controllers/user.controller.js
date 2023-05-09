const mongoose = require('mongoose');
const Student = require('../models/student.model');
const Tutor = require('../models/tutor.model');

const jwt = require('jsonwebtoken');

const getUserData = async (req, res) => {
  try {
    const token = req.query.token;
    const data = jwt.verify(token, 'secret key');
    res.json(data);
  } catch (error) {
    res.send(500);
  }
};

module.exports = { getUserData };
