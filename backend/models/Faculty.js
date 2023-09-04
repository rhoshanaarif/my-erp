const mongoose = require('mongoose');


const facultySchema = new mongoose.Schema({
    facultyName: { type: String, required: true },
    isMarried: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    caste: { type: String, required: true },
    religion: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    staffCode: { type: String, required: true },
    email: { type: String, required: true },
    uploadPhoto: { type: String, required: true },
    doorNumber: { type: String, required: true },
    street: { type: String, required: true },
    postalCity: { type: String, required: true },
    postalCode: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    contactNumber: { type: String, required: true },
    jobCategory: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    joiningDate: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    
    //relation of other ID
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  });
  
  const Faculty = mongoose.model('Faculty', facultySchema);

  module.exports = Faculty;
  