const express = require("express");
const router = express.Router();
const Batch = require("../models/Batches");

// POST request to create a new batch
router.post("/", async (req, res) => {
  try {
    const { batchStart, batchEnd, status } = req.body;

    const newBatch = new Batch({
      batchStart,
      batchEnd,
      status,
    });

    const savedBatch = await newBatch.save();
    res.json(savedBatch);
  } catch (error) {
    console.error("Error creating batch:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the batch." });
  }
});

// GET request to fetch all batches
router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (error) {
    console.error("Error fetching batches:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching batches." });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const batchId = req.params.id;
    const { batchStart, batchEnd, status } = req.body;

    // Find the batch by ID
    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    // Update the batch properties
    batch.batchStart = batchStart;
    batch.batchEnd = batchEnd;
    batch.status = status;

    // Save the updated batch
    const updatedBatch = await batch.save();
    res.json(updatedBatch);
  } catch (error) {
    console.error("Error updating batch:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the batch." });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const batchId = req.params.id;

    // Find the batch by ID
    const deletedBatch = await Batch.findByIdAndDelete(batchId);

    if (!deletedBatch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    res.json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting batch:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the batch." });
  }
});
module.exports = router;
