const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Completed', 'In Progress', 'Not Started'], required: true },
  marks: { type: Number, required: true },
});

module.exports = mongoose.model('Evaluation', evaluationSchema);