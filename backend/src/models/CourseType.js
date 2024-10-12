const mongoose = require('mongoose');

const courseTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('CourseType', courseTypeSchema);