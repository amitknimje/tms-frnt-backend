const express = require('express');
const router = express.Router();
const Allotment = require('../models/Allotment');

// Get all allotments
router.get('/', async (req, res) => {
  try {
    const allotments = await Allotment.find()
      .populate('candidate')
      .populate('course')
      .populate('expert')
      .populate('location');
    res.json(allotments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new allotment
router.post('/', async (req, res) => {
  const allotment = new Allotment({
    candidate: req.body.candidate,
    course: req.body.course,
    expert: req.body.expert,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    location: req.body.location,
  });

  try {
    const newAllotment = await allotment.save();
    res.status(201).json(newAllotment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an allotment
router.put('/:id', async (req, res) => {
  try {
    const allotment = await Allotment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(allotment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an allotment
router.delete('/:id', async (req, res) => {
  try {
    await Allotment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Allotment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;