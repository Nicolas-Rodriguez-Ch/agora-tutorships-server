const mongoose = require("mongoose");
const Tutor = require("./tutor.model")
const Student = require("./Student.model")

const favoriteSchema = mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  tutor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
    required: true
  },
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
