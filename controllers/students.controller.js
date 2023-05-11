const mongoose = require("mongoose");
const Students = require("../models/student.model");

const getStudents = async (req, res) => {
  try {
    const students = await Students.find({ _id: req.params.id }, [
      "name",
      "profile_photo",
      "email",
      "stripe_customer_id",
    ]);
    res.send({ students });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getStudents };
