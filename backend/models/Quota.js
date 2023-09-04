const mongoose = require('mongoose');

const quotaSchema = new mongoose.Schema({
 
  quota: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Quota = mongoose.model('Quota', quotaSchema);

module.exports = Quota;
