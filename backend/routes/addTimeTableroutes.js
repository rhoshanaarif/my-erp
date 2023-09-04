const express = require('express');
const router = express.Router();
const Timetable = require('../models/TimeTable');

// Create a new timetable entry
router.post('/', async (req, res) => {
  try {
    const { weekStartDate, weekEndDate, timetableData, classId } = req.body;
    const timetableEntry = new Timetable({ weekStartDate, weekEndDate, timetableData, classId });
    await timetableEntry.save();
    res.status(201).json({ message: 'Timetable entry created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the timetable entry' });
  }
});

// Get all timetable entries
router.get('/', async (req, res) => {
  try {
    const timetableEntries = await Timetable.find();
    res.status(200).json(timetableEntries);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching timetable entries' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const timetableId = req.params.id;
    const updatedTimetableData = req.body; // Make sure this matches your expected format

    // Update the timetable entry in the database using the ID
    await Timetable.findByIdAndUpdate(timetableId, updatedTimetableData);

    res.status(200).json({ message: 'Timetable entry updated successfully' });
  } catch (error) {
    console.error('Error updating timetable entry:', error);
    res.status(500).json({ error: 'An error occurred while updating the timetable entry' });
  }
});

router.delete('/:id', async (req, res) => {
  const timetableId = req.params.id;

  try {
    // Delete the timetable from the database by its ID
    await Timetable.findByIdAndDelete(timetableId);
    res.json({ message: 'Timetable deleted successfully.' });
  } catch (error) {
    console.error('Error deleting timetable:', error);
    res.status(500).json({ error: 'An error occurred while deleting the timetable.' });
  }
});


module.exports = router;
