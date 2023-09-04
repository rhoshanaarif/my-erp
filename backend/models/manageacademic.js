const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
  fromYear: {
    type: Number,
    required: true,
  },
  toYear: {
    type: Number,
    required: true,
  },
  oddSemStartDate: {
    type: Date,
    required: true,
  },
  oddSemEndDate: {
    type: Date,
    required: true,
  },
  evenSemStartDate: {
    type: Date,
    required: true,
  },
  evenSemEndDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Academic = mongoose.model('Academic', academicSchema);

module.exports = Academic;
