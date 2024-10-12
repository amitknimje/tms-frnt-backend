const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');

// Get all evaluations
router.get('/', async (req, res) => {
  try {
    const evaluations = await Evaluation.find().populate('candidate').populate('course');
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new evaluation
router.post('/', async (req, res) => {
  const evaluation = new Evaluation({
    candidate: req.body.candidate,
    course: req.body.course,
    date: req.body.date,
    status: req.body.status,
    marks: req.body.marks,
  });

  try {
    const newEvaluation = await evaluation.save();
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an evaluation
router.put('/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(evaluation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an evaluation
router.delete('/:id', async (req, res) => {
  try {
    await Evaluation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Evaluation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;