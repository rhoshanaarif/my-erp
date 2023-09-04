// routes/calendars.js
const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');

// Get all calendars
router.get('/', async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.json(calendars);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calendars' });
  }
});

// Create a new calendar
router.post('/', async (req, res) => {
  try {
    const { date, dayorder } = req.body;
    const newcalendar = new Calendar({ date, dayorder });
    await newcalendar.save();
    res.status(201).json(newcalendar);
  } catch (error) {
    res.status(400).json({ error: 'Error creating calendar' });
  }
});

// Update the dayOrder of a calendar
router.put('/:id', async (req, res) => {
  try {
    const calendar = await Calendar.findByIdAndUpdate(req.params.id, { dayorder: req.body.dayorder }, { new: true });
    res.json(calendar);
  } catch (error) {
    res.status(400).json({ error: 'Error updating calendar' });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const deletedCalendar = await Calendar.findByIdAndDelete(req.params.id);
      if (!deletedCalendar) {
        return res.status(404).json({ error: 'Calendar not found' });
      }
      res.json(deletedCalendar);
    } catch (error) {
      res.status(400).json({ error: 'Error deleting calendar' });
    }
  });

module.exports = router;
