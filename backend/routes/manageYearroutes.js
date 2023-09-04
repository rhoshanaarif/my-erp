const express = require("express");
const router = express.Router();
const Year = require("../models/studentYear");

router.get("/", async (req, res) => {
  try {
    const years = await Year.find();
    res.status(200).json(years);
  } catch (error) {
    console.error("Error fetching student years:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching student years" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { studentYear, status } = req.body;
    const newYear = new Year({
      studentYear,
      status,
    });
    await newYear.save();
    res.status(201).json(newYear);
  } catch (error) {
    console.error("Error creating year:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the year." });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedYear = await Year.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          studentYear: req.body.studentYear,
          status: req.body.status,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedYear);
  } catch (error) {
    console.error("Error updating year:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the year" });
  }
});

// DELETE route to delete a student year
router.delete("/:id", async (req, res) => {
  try {
    await Year.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Year deleted successfully" });
  } catch (error) {
    console.error("Error deleting year:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the year" });
  }
});
module.exports = router;
