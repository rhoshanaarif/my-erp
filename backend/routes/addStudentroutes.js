const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Class = require("../models/Class");
const moment = require("moment");
const mongoose = require("mongoose");

router.post("/", (req, res) => {
  const inputValues = req.body;
  console.log(inputValues);
  const newStudent = new Student(inputValues);
  newStudent
    .save()
    .then(() => {
      const response = {
        success: true,
        message: "Student added successfully",
        newStudent,
      };
      res.json(response);
    })
    .catch((error) => {
      console.error("Failed to add student:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add student" });
    });
});


// Route to fetch students based on the selected view
router.get("/", (req, res) => {
  const {
    institution,
    graduation,
    department,
    batch,
    yearAdmitted,
    status,
  } = req.query;
console.log(yearAdmitted);
  // Build the filter object based on provided parameters
  
  const filter = {};
  if (institution !== "All Institution") {
    filter["officeDetails.institution"] = institution;
  }
  if (graduation !== "All Graduation") {
    filter["markDetails.graduation"] = graduation;
  }
  if (department !== "All Department") {
    filter["officeDetails.programmeAdmittedFor"] = department;
  }
  if (batch !== "All Batch") {  // Change institution to batch
    filter["officeDetails.batch"] = batch;
  }
  if (yearAdmitted !== "All Year") {  // Change graduation to year
    filter["officeDetails.yearAdmitted"] = yearAdmitted;
  }
  if (status !== "All Students status") {  // Change department to status
    filter["officeDetails.promotionStatus"] = status;
  }
  // ... Repeat for other filter parameters

  Student.find(filter)  // Use the filter object here
  .then((students) => {
    res.status(200).json(students);
  })
  .catch((error) => {
    console.error("Failed to retrieve faculty data:", error);
    res.status(500).json({ error: "Failed to retrieve faculty data" });
  });
});

// Route to fetch students based on the selected class
router.get("/:selectedClass", async (req, res) => {
  try {
    const selectedClass = req.params.selectedClass; // Access the actual value
    const students = await Student.find({ "officeDetails.classId": selectedClass });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get('/edit/:id', async (req, res) => {
  try {
    
    const student = await Student.findById(req.params.id);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post("/updateClassWithStudent", async (req, res) => {
  try {
    const { classId, studentId } = req.body;

    // Find the class document by ID and update the "students" field with the new student ID
    await Class.findByIdAndUpdate(
      classId,
      { $push: { students: studentId } },
      { new: true }
    );

    res.status(200).json({ message: "Class updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating class document." });
  }
});
// Update student data
router.put('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudentData = req.body;

    // Update the student data in the database
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true } // Return the updated student after the update
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student data:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

router.put("/:id", (req, res) => {
  const StudentId = req.params.id;
  const {
    studentName,
    email,
    department,
    dob,
    year,
    rollNo,
    gender,
    contactNumber,
    fatherName,
    fatherContactNumber,
    motherName,
    motherContactNumber,
    aadharNumber,
  } = req.body;
  console.log(studentName);
  const formattedDob = moment(dob).format("DD-MM-YYYY");
  Student.findByIdAndUpdate(StudentId, {
    studentName,
    rollNo,
    email,
    department,
    dob: formattedDob,
    year,
    gender,
    contactNumber,
    fatherName,
    fatherContactNumber,
    motherName,
    motherContactNumber,
    aadharNumber,
  })
    .then((updatedStudent) => {
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      res
        .status(200)
        .json({ message: "Student updated successfully", updatedStudent });
    })
    .catch((error) => {
      console.error("Failed to update student:", error);
      res.status(500).json({ error: "Failed to update student" });
    });
});

router.put("/remove/:studentId/:classId", async (req, res) => {
  const { studentId, classId } = req.params;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    // Update the student document
    await Student.findByIdAndUpdate(studentId, { classId: null }, { session });

    // Update the class document
    await Class.findByIdAndUpdate(
      classId,
      { $pull: { students: studentId } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Student class updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Find the student document by ID
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Remove the student ID from the 'students' array in the associated class document
    const classId = deletedStudent.classId; // Assuming you have a classId field in the student document
    if (classId) {
      const classDoc = await Class.findByIdAndUpdate(
        classId,
        { $pull: { students: studentId } },
        { new: true }
      );
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;