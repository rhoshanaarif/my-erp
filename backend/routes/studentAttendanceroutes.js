// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');



// Route to add attendance record
router.post('/', async (req, res) => {
  try {
    const { classId, date, hour,subject, students } = req.body;
    // Create a new attendance document
    const attendanceRecord = new Attendance({
      classId,
      date,
      hour,
      subject,
      students,
    });

    // Save the attendance record to the database
    await attendanceRecord.save();

    res.status(201).json(attendanceRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:selectedDate', async (req, res) => {
  try {
    const selectedDate = req.params.selectedDate;
    // Assuming your attendance model has a field named 'date' to store the date of attendance
    const attendanceData = await Attendance.find({ date: selectedDate });
    res.json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'An error occurred while fetching attendance data.' });
  }
});



// Route to get attendance records for a specific classId on a given date and hour
router.get('/:classId/:date/:hour', async (req, res) => {
  try {
    const { classId, date, hour } = req.params;

    const attendanceRecord = await Attendance.findOne({
      classId,
      date,
      hour,
    });

    if (!attendanceRecord) {
      return res.json({ isMarked: false, absentCount: 0 });
    }

    const absentStudentsCount = attendanceRecord.students.reduce((count, student) => {
      if (student.status === 'absent') {
        return count + 1;
      }
      return count;
    }, 0);

    res.json({ isMarked: true, absentCount: absentStudentsCount, attendance: attendanceRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to update attendance records for a specific classId on a given date and hour
router.put('/:classId/:date/:hour', async (req, res) => {
  try {
    const { classId, date, hour } = req.params;
    const { students } = req.body;

    const attendanceRecord = await Attendance.findOneAndUpdate(
      { class: classId, date: new Date(date), hour },
      { students },
      { new: true }
    ).populate('students', '-__v');

    if (!attendanceRecord) {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.json(attendanceRecord);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete attendance records for a specific classId on a given date and hour
router.delete('/:classId/:date/:hour', async (req, res) => {
  try {
    const { classId, date, hour } = req.params;

    const deletedRecord = await Attendance.findOneAndDelete({
      class: classId,
      date: new Date(date),
      hour,
    });

    if (!deletedRecord) {
      res.status(404).json({ message: 'Attendance record not found' });
    } else {
      res.json({ message: 'Attendance record deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
