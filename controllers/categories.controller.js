const mongoose = require('mongoose')
const Categories = require("../models/categories.model");

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find().sort({subject:'ascending'});
    res.send({categories});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports =  {getCategories};