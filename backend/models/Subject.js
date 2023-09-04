const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  facultyName: { type: String, required: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
