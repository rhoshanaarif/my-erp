const express = require("express");
const Faculty = require("../models/Faculty");
const moment = require("moment");
const router = express.Router();

router.post("/", (req, res) => {
  const facultyValues = req.body;
  console.log(facultyValues);
  const newFaculty = new Faculty(facultyValues);

  // Save the newFaculty document to MongoDB
  newFaculty
    .save()
    .then(() => {
      res.status(201).json({ message: "Faculty data stored successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to store faculty data" });
    });
});

router.get("/", (req, res) => {
  Faculty.find()
    .then((faculties) => {
      res.status(200).json(faculties);
    })
    .catch((error) => {
      console.error("Failed to retrieve faculty data:", error);
      res.status(500).json({ error: "Failed to retrieve faculty data" });
    });
});

router.put("/:id", (req, res) => {
  const facultyId = req.params.id;
  const updatedFacultyData = req.body; // This will contain all the fields

  // You can apply any necessary validation or formatting here

  Faculty.findByIdAndUpdate(facultyId, updatedFacultyData)
    .then((updatedFaculty) => {
      if (!updatedFaculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }
      res.status(200).json({ message: "Faculty updated successfully" });
    })
    .catch((error) => {
      console.error("Failed to update faculty:", error);
      res.status(500).json({ error: "Failed to update faculty" });
    });
});


// Delete a faculty by ID
router.delete("/:id", (req, res) => {
  const facultyId = req.params.id;

  Faculty.findByIdAndRemove(facultyId)
    .then((deletedFaculty) => {
      if (!deletedFaculty) {
        return res.status(404).json({ error: "Faculty not found" });
      }
      res.status(200).json({ message: "Faculty deleted successfully" });
    })
    .catch((error) => {
      console.error("Failed to delete faculty:", error);
      res.status(500).json({ error: "Failed to delete faculty" });
    });
});

module.exports = router;
