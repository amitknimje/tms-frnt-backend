const mongoose = require('mongoose');

const allotmentSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
});

module.exports = mongoose.model('Allotment', allotmentSchema);