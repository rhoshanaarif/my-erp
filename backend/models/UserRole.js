const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  userRole: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Userrole = mongoose.model('Userrole', userRoleSchema);

module.exports = Userrole;
