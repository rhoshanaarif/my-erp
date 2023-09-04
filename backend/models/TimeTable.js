const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  weekStartDate: String,
  weekEndDate: String,
  timetableData: [
    {
      date: String,
      day: String,
      hour: String,
      subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject', // Assuming the name of your Subject model
      },
      session: String,    // Include the session property
      startTime: String,  // Include the startTime property
      endTime: String,    // Include the endTime property
    },
  ],
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;