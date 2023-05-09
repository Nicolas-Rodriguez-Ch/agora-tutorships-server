const Tutor = require('../models/tutor.model');
const Review = require('../models/review.model');

const getTutorData = async (req, res) => {
  try {
    const tutor = await Tutor.findById({ _id: req.params.id });
    const {
      name,
      email,
      profile_photo,
      description,
      profession,
      focus,
      rating,
    } = tutor;
    const reviews = await Review.find({ tutor_id: req.params.id }).populate(
      'student_id',
      'name',
    );
    const tutorData = {
      name,
      email,
      profile_photo,
      description,
      profession,
      focus,
      rating,
      reviews,
    };
    res.status(200).json(tutorData);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getTutorData };
