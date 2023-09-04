const express = require("express");
const router = express.Router();
const Academic = require("../models/manageacademic"); // Replace with your model

router.get("/", async (req, res) => {
    try {
      const academicData = await Academic.find(); // Fetch all academic data
      res.status(200).json(academicData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Error fetching academic data." });
    }
  });

router.post("/", async (req, res) => {
  try {
    const {
      fromYear,
      toYear,
      oddSemStartDate,
      oddSemEndDate,
      evenSemStartDate,
      evenSemEndDate,
      status,
    } = req.body;

    const academicData = {
      fromYear,
      toYear,
      oddSemStartDate,
      oddSemEndDate,
      evenSemStartDate,
      evenSemEndDate,
      status,
    };

    const newAcademic = new Academic(academicData); // Use the Academic model here
    await newAcademic.save();

    res.status(201).json({ message: "Academic data saved successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error saving academic data." });
  }
});
// PUT update existing academic data by ID
router.put("/:id", async (req, res) => {
  try {
    const academicId = req.params.id;
    const updatedAcademicData = req.body;

    await Academic.findByIdAndUpdate(academicId, updatedAcademicData);

    res.status(200).json({ message: "Academic data updated successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error updating academic data." });
  }
});

// DELETE academic data by ID
router.delete("/:id", async (req, res) => {
  try {
    const academicId = req.params.id;

    await Academic.findByIdAndDelete(academicId);

    res.status(200).json({ message: "Academic data deleted successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error deleting academic data." });
  }
});

module.exports = router;

