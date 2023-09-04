const mongoose = require('mongoose');


// Create the MongoDB model

const hourSchema = new mongoose.Schema({
    hours: { type: String, required: true },
    session: {type: String, required: true}, 
    description: { type: String, required: false },
  });

  const Hour = mongoose.model('Hour', hourSchema);

  module.exports = Hour;