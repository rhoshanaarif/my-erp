const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchStart: {
    type: Number,
    required: true,
  },
  batchEnd: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;
