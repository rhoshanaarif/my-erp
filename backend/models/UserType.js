const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
  userRole: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Usertype = mongoose.model('Usertype', userTypeSchema);

module.exports = Usertype;
