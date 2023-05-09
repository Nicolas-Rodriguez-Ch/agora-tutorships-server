const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, 'Email is required'],
      validate: {
        validator: async function (value) {
          const student = await Student.findOne({ email: value });
          const tutor = await mongoose.model('Tutor').findOne({ email: value });
          if (student || tutor) return false;
        },
        message: 'Duplicated Email',
      },
    },
    password: {
      type: String,
      required: true,
    },
    profile_photo: String,
    epayco_customer_id: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

studentSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

studentSchema.statics.authenticate = async (email, password) => {
  const student = await Student.findOne({ email });
  if (student) {
    const result = await bcrypt.compare(password, student.password);
    return result === true ? student : null;
  }

  return null;
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
