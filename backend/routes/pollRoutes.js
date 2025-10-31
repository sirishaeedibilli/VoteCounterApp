const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// ✅ Fetch all poll options
router.get('/', async (req, res) => {
  try {
    const options = await Poll.find();
    res.json(options);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add a new option
router.post('/', async (req, res) => {
  try {
    const newOption = new Poll({ option: req.body.option });
    await newOption.save();
    res.json({ message: 'Option added!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Vote for an option
router.put('/:id', async (req, res) => {
  try {
    const option = await Poll.findById(req.params.id);
    if (!option) return res.status(404).json({ message: 'Option not found' });

    option.votes += 1;
    await option.save();
    res.json({ message: 'Vote counted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
