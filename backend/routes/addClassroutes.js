const express = require("express");
const router = express.Router();
const Class = require("../models/Class");
const Student = require("../models/Student")
const Department = require("../models/Department")
// Add a new department
router.post("/", async (req, res) => {
  try {
    const { name, toDate, fromDate, semester, department } = req.body;

    // Create a new class instance
    const newClass = new Class({ name, toDate, fromDate, semester, department });

    // Save the class to the database
    const savedClass = await newClass.save();

    // Update the department's "classes" column with the new class ID
    const updatedDepartment = await Department.findOneAndUpdate(
      { _id: department },
      { $push: { classes: savedClass._id } }, // Add the class ID to the "classes" array
      { new: true }
    );

    const response = {
      success: true,
      message: "Class added successfully",
      class: savedClass,
      updatedDepartment,
    };
    res.json(response);
  } catch (error) {
    console.error("Failed to add class:", error);
    res.status(500).json({ success: false, message: "Failed to add class" });
  }
});

router.get("/", (req, res) => {
  Class.find()
    .then((classes) => {
      res.json(classes);
    })
    .catch((error) => {
      console.error("Failed to retrieve classes:", error);
      res.status(500).json({ success: false, message: "Failed to retrieve classes" });
    });
});

//update a class name
router.put("/name/:_id", (req, res) => {
  const { _id } = req.params
  const { name, fromDate,toDate, semester, department } = req.body;
  console.log(semester)

  Class.findByIdAndUpdate(_id, { name, fromDate, toDate, semester, department }, { new: true })
    .then((updatedClass) => {
      if (!updatedClass) {
        return res.status(404).json({ success: false, message: "class not found" });
      }
      res.json({ success: true, message: "class updated successfully", class: updatedClass });
    })
    .catch((error) => {
      console.error("Failed to update class:", error);
      res.status(500).json({ success: false, message: "Failed to update class" });
    });
});
router.put("/department/:_id", (req, res) => {
    const { _id } = req.params
    const { department } = req.body;
  console.log(_id, department)
    Class.findByIdAndUpdate(_id, { department }, { new: true })
      .then((updatedClass) => {
        if (!updatedClass) {
          return res.status(404).json({ success: false, message: "class not found" });
        }
        res.json({ success: true, message: "class updated with department id successfully", class: updatedClass });
      })
      .catch((error) => {
        console.error("Failed to update class with department id :", error);
        res.status(500).json({ success: false, message: "Failed to update class with department id" });
      });
  });

  // Route to update class document with student ID
// router.put('/updateClassWithStudent', async (req, res) => {
//   try {
//     const { classId, studentId } = req.body;

//     // Find the class document by ID and update the "students" field with the new student ID
//     await Class.findByIdAndUpdate(
//       classId,
//       { $push: { students: studentId } },
//       { new: true }
//     );

//     res.status(200).json({ message: 'Class updated successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating class document.' });
//   }
// });
  // PUT route to handle assigning students to a class
  router.put("/students/:classId", async (req, res) => {
    const { classId } = req.params;
    const { students } = req.body;
    console.log(students)
    try {
      // Find the class document
      const classDoc = await Class.findById(classId);
      console.log(classDoc)
      if (!classDoc) {
        return res.status(404).json({ error: "Class not found" });
      }
  
      // Use $push to add the new student IDs to the existing array
      classDoc.students.push(...students);
      await classDoc.save();
  
      // Update the class field in each student document
      await Student.updateMany(
        { _id: { $in: students } },
        { $set: { classId: classId } }
      );
  
      // Respond with success message or updated class document
      res.status(200).json({ message: "Students assigned to class successfully", classDoc });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// PUT route to remove a student from the 'students' array of a class document
router.put('/pull/:classId/:studentId', async (req, res) => {
  const { classId, studentId } = req.params;

  try {
    // Find the class document by ID
    const classDoc = await Class.findById(classId);

    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Remove the studentId from the 'students' array
    classDoc.students.pull(studentId);
    await classDoc.save();

    res.status(200).json({ message: 'Student removed from the class successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Delete a class
// DELETE a class by ID and set classId of all students in that class to null
router.delete('/:classId', async (req, res) => {
  try {
    const { classId } = req.params;

    // Find the class document by ID
    const classDoc = await Class.findById(classId);

    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Update the classId of all students in that class to null
    await Student.updateMany(
      { classId: classId },
      { $set: { classId: null } }
    );

    // Delete the class document
    await Class.findByIdAndDelete(classId);

    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;