const mongoose = require('mongoose')
const Tutor = require("../models/tutor.model");


const findTutors = async (req, res) => {
  try {
    const page = req.params.page || 1
    const count = await Tutor.count({focus: req.params.focus})
    const data = await Tutor.find({focus: req.params.focus},
      ['name', 'profile_photo', 'profession', 'focus', 'rating', 'description'])
      .sort({rating: -1})
      .skip((page-1)*9)
      .limit(9)
 
    res.json({
      count,
      page,
      data
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports =  {findTutors};