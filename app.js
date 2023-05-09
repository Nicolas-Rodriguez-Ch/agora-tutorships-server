require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const registerRoute = require('./routes/register');
const tutorSearch = require('./routes/tutorSearch');
const tutorProfileRoutes = require('./routes/tutorProfile');
const categories = require('./routes/categories');
const tutors = require('./routes/tutors');
const updateProfile = require('./routes/updateProfile');
const loginRoute = require('./routes/login');
const tutorships = require('./routes/tutorships');
const students = require('./routes/students.js');
const payments = require('./routes/payment');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(loginRoute);
app.use(registerRoute);
app.use(tutorProfileRoutes);
app.use(categories);
app.use(tutors);
app.use(updateProfile);
app.use(tutorSearch);
app.use(tutorships);
app.use(students);
app.use(payments);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established succesfully');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

module.exports = app;
