const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
 
  accountNumber: {
    type: String,
    required: true,
  },
 accountName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const AccountNumber = mongoose.model('AccountNumber', accountSchema);

module.exports = AccountNumber;
