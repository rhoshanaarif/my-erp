const mongoose = require('mongoose');

const dayOrderSchema = new mongoose.Schema({
    dayorder: Number,
  day: String,
  totalperiod: Number,
  periods: [{
    hour: String,
    session: String,
    startTime: String,
    endTime: String
  }]
});

const DayOrder = mongoose.model('DayOrder', dayOrderSchema);

module.exports = DayOrder;
