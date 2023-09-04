// models/task.js
const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  
  dayorder: Number,
  date: Date,   
  
});

const Task = mongoose.model('Calendar', calendarSchema);

module.exports = Task;
