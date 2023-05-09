const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  tutor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutor',
    required: true,
  },
  tutorship_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorship',
    required: true,
  },
  comment: String,
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
