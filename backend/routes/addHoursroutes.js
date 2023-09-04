const express = require('express');
const Hour = require('../models/Hour');
const router = express.Router();


// Create a new hour entry
router.post('/', async (req, res) => {
    try {
      const {  hours, session } = req.body;
      const newHour = new Hour({  hours, session });
      await newHour.save();
      res.json(newHour);
    } catch (err) {
      res.status(500).json({ error: 'Unable to add hour entry' });
    }
  });
  
  // Read all hour entries
  router.get('/', async (req, res) => {
    try {
      const hours = await Hour.find();
      res.json(hours);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch hour entries' });
    }
  });
  
  // Read a specific hour entry
  router.get('/:id', async (req, res) => {
    try {
      const hour = await Hour.findById(req.params.id);
      if (!hour) {
        return res.status(404).json({ error: 'Hour entry not found' });
      }
      res.json(hour);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch hour entry' });
    }
  });
  
  // Update a specific hour entry
  router.put('/:id', async (req, res) => {
    try {
      const { hours } = req.body;
      const updatedHour = await Hour.findByIdAndUpdate(
        req.params.id,
        { hours },
        { new: true }
      );
      if (!updatedHour) {
        return res.status(404).json({ error: 'Hour entry not found' });
      }
      res.json(updatedHour);
    } catch (err) {
      res.status(500).json({ error: 'Unable to update hour entry'});
    }
  });
  
  // Delete a specific hour entry
  router.delete('/:id', async (req, res) => {
    try {
      const deletedHour = await Hour.findByIdAndRemove(req.params.id);
      if (!deletedHour) {
        return res.status(404).json({ error: 'Hour entry not found' });
      }
      res.json(deletedHour);
    } catch (err) {
      res.status(500).json({ error: 'Unable to delete hour entry' });
    }
  });


module.exports = router;