const express = require('express');
const Subject = require('../models/Subject');
const Faculty = require('../models/Faculty');
const router = express.Router();

router.get('/', (req, res) => {
  Subject.find()
    .then((subjects) => {
      res.status(200).json(subjects);
    
    })
    .catch((error) => {
      console.error('Failed to retrieve Subject data:', error);
      res.status(500).json({ error: 'Failed to retrieve Subject data' });
    });
});



router.post('/', (req, res) => {
  // Create a new Subject document using Mongoose model
  const { subjectName, subjectCode, department, year,facultyName } = req.body;
  const newSubject = new Subject({
    subjectName,
    subjectCode,
    department,
    year,
    facultyName,
    facultyId: null,
  });
console.log(newSubject);
  // Save the newSubject document to MongoDB
  newSubject.save()
    .then(() => {
      res.status(201).json({ message: 'Subject data stored successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to store subject data' });
    });
});

router.post('/assign-subject', async (req, res) => {
  try {
    const { subjectId, facultyId } = req.body;

    // Find the selected subject and faculty
    const selectedSubject = await Subject.findById(subjectId);
    const selectedFaculty = await Faculty.findById(facultyId);

    if (selectedSubject && selectedFaculty) {
      // Update the subject document with the faculty ID
      selectedSubject.facultyId = selectedFaculty._id;
      await selectedSubject.save();

      // Update the faculty document with the assigned subject ID
      selectedFaculty.subjects.push(selectedSubject._id);
      await selectedFaculty.save();

      res.status(200).json({ message: 'Subject assigned successfully.' });
    } else {
      res.status(404).json({ message: 'Subject or faculty not found.' });
    }
  } catch (error) {
    console.error('Error assigning subject:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});
// Update a subject by ID
router.put('/:id', async (req, res) => {
  const subjectId = req.params.id;
  const updateData = req.body; // Data to update the subject with

  try {
    // Find the subject by ID and update it
    const updatedSubject = await Subject.findByIdAndUpdate(subjectId, updateData, { new: true });

    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(updatedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const subjectId = req.params.id;

    // Delete associated records in other tables, e.g., class schedules
    await Faculty.deleteMany({ subject: subjectId });

    // Then delete the subject
    await Subject.findByIdAndDelete(subjectId);

    res.status(204).send(); // Respond with success (No Content)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// router.delete("/:id", async (req, res) => {
//   try {
//     const subjectId = req.params;

//     await Subject.findByIdAndDelete(subjectId);

//     res.json({ message: "User role deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting user role:", error);
//     res.status(500).json({ error: "An error occurred while deleting user role." });
//   }
// });

module.exports = router;
