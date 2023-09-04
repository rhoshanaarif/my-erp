const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  studentYear: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Year = mongoose.model('Year', yearSchema);

module.exports = Year;
