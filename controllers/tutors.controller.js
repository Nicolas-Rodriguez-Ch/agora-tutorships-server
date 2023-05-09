const mongoose = require('mongoose');
const Tutor = require('../models/tutor.model');

const getTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find({ focus: req.params.subject }, [
      'name',
      'profile_photo',
      'profession',
      'focus',
      'rating',
      'description',
    ])
      .sort({ rating: -1 })
      .limit(4);
    res.send({ tutors });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getTutors };
