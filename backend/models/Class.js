const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: String, required: true },
  fromDate:{type: Date, required: true},
  toDate:{type: Date, required: true},
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: false },
  students: [{type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false }],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
