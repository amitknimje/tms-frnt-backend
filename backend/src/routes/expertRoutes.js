const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');

// Get all experts
router.get('/', async (req, res) => {
  try {
    const experts = await Expert.find();
    res.json(experts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new expert
router.post('/', async (req, res) => {
  const expert = new Expert({
    name: req.body.name,
    email: req.body.email,
    specialization: req.body.specialization,
  });

  try {
    const newExpert = await expert.save();
    res.status(201).json(newExpert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an expert
router.put('/:id', async (req, res) => {
  try {
    const expert = await Expert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(expert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an expert
router.delete('/:id', async (req, res) => {
  try {
    await Expert.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expert deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;