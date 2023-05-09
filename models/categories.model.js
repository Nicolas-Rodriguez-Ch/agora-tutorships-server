const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model("Categories", categoriesSchema);
module.exports = Categories;
