const Tutor = require('../models/tutor.model');
const Student = require('../models/student.model');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail')
require('dotenv').config({path: '../.env'})


const createUser = async (req, res) => {
  try {
    const { type, inputs } = req.body;

    let userSchema = '';
    userSchema = type === 'student' ? Student : Tutor;

    const user = await new userSchema(inputs);
    await user.save();

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 15 * 24 * 60 * 60,
        userId: user._id,
        type: `${type}`,
        userData: user,
      },
      'secret key',
    );
    const userInfo = { token, userData: user };
    res.status(201).json(userInfo);
    
    sendEmail({
      user: user,
      template: 'd-a6c521c5342a44de876d561ae7b5e4ad',
      template_data: {"name": user.name}
    })

    
    
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }

};

module.exports = { createUser };
