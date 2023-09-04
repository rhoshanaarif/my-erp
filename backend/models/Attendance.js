const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: String, required: true },
  hour: { type: String, required: true },
  subject: { type: String, required: true },
  students: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    status: { type: String, enum: ['present', 'absent', 'onduty'], required: true }
  }],
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
