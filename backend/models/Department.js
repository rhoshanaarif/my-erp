const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  departmentType: { type: String, required: true },
  institution: { type: String, required: true },
  semester: { type: Number, required: true },
  duration: { type: Number, required: true },
  numberOfSeats: { type: Number, required: true },
  status: { type: String, required: true },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" , required : false}],
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
