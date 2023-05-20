const Tutor = require("../models/tutor.model");
const Student = require("../models/student.model");
const Tutorship = require("../models/tutorship.model");
const sendEmail = require("../utils/sendEmail");

const createTutorship = async (req, res, next) => {
  try {
    const {
      email: studentMail,
      studentName: studentName,
      _id: student_id,
    } = req.body.student;
    const { name: tutorName, email: tutorEmail } = req.body.tutor;

    const { date, time } = req.body.inputs;

    const student = await Student.findOne({ studentMail });
    if (student) {
      const newDate = `${date}T${time}:00.000z`;
      const tutor = await Tutor.findOne({ tutorEmail });
      const { _id: tutor_id } = tutor;

      const tutorship = await Tutorship.create({
        student_id,
        date: newDate,
        tutor_id,
      });
      res.status(200).json(tutorship);
      // Send Email Student
      sendEmail({
        user: student,
        template: "d-a6c521c5342a44de876d561ae7b5e4ad",
        template_data: {
          student: student.name,
          tutor: tutor.name,
          subject: tutor.focus,
          date: newDate.slice(0, 10),
          status: "created but is pending for payment",
          url: "https://agora-projectagora2021-gmailcom.vercel.app/profile/tutorships",
        },
      });
      // Send Email Tutor
      sendEmail({
        user: tutor,
        template: "d-4347de2b9f6c4d129c7c53f5a29d99dd",
        template_data: {
          student: student.name,
          tutor: tutor.name,
          date: newDate.slice(0, 10),
          status: "created but is pending for payment",
          url: "https://agora-projectagora2021-gmailcom.vercel.app/profile/tutorships",
        },
      });
      next();
    } else {
      res.status(400).json({ message: "Student email not found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTutorships = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user =
      (await Student.findOne({ _id: id })) ||
      (await Tutor.findOne({ _id: id }));
    const userType = user.focus ? "tutor_id" : "student_id";
    const tutorships = await Tutorship.find({ [userType]: user.id })
      .populate("tutor_id")
      .populate("student_id")
      .exec();
    res.status(200).json(tutorships);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTutorship = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tutorship = await Tutorship.findOne({ _id: id })
      .populate("tutor_id")
      .populate("student_id")
      .exec();
    if (!tutorship) {
      return res.status(404).json({ message: "Tutorship not found" });
    }
    res.status(200).json(tutorship);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createTutorship, getTutorships, getTutorship };
