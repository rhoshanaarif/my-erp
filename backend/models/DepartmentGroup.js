const mongoose = require('mongoose');

const deptgroupschema = new mongoose.Schema({
    departmentGroup: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create the academic model
const Departmentgroup = mongoose.model('Departmentgroup', deptgroupschema);

module.exports = Departmentgroup;
