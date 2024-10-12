const express = require('express');
const router = express.Router();
const CourseType = require('../models/CourseType');

// Get all course types
router.get('/', async (req, res) => {
  try {
    const courseTypes = await CourseType.find();
    res.json(courseTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new course type
router.post('/', async (req, res) => {
  const courseType = new CourseType({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newCourseType = await courseType.save();
    res.status(201).json(newCourseType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a course type
router.put('/:id', async (req, res) => {
  try {
    const courseType = await CourseType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(courseType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a course type
router.delete('/:id', async (req, res) => {
  try {
    await CourseType.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course type deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;