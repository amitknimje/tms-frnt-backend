const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  courseType: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseType', required: true },
  duration: { type: String, required: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
});

module.exports = mongoose.model('Course', courseSchema);