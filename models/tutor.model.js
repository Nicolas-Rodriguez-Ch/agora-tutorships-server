const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tutorSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, 'Email is required'],
      validate: {
        validator: async function (value) {
          const tutor = await Tutor.findOne({ email: value });
          const student = await mongoose.model('Student').findOne({ email: value });
          if (student || tutor) return false;
        },

        message: 'Duplicated Email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      default: 'from mondays to fridays, from 8:30am to 5:00pm',
    },
    profile_photo: String,
    description: String,
    profession: String,
    focus: String,
    rating: Number,
    price: Number
  },
  {
    timestamps: true,
  },
);

tutorSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

tutorSchema.statics.authenticate = async (email, password) => {
  const tutor = await Tutor.findOne({ email });
  if (tutor) {
    const result = await bcrypt.compare(password, tutor.password);
    return result === true ? tutor : null;
  }

  return null;
};

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;
