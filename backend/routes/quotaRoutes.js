const express = require("express");
const router = express.Router();
const Quota = require("../models/Quota");

// Create a new user role
router.post("/", async (req, res) => {
  try {
    const { quota, status } = req.body;

    const newQuota = new Quota({
      quota,
      status,
    });

    const savedQuota = await newQuota.save();
    res.json(savedQuota);
  } catch (error) {
    console.error("Error creating user role:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating user role." });
  }
});

// Fetch all user roles
router.get("/", async (req, res) => {
  try {
    const quotas = await Quota.find();
    res.json(quotas);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user roles." });
  }
});

// PUT Route for Updating User Role
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quota, status } = req.body;

    // Find the user role by ID and update it
    const updatedQuota = await Quota.findByIdAndUpdate(
      id,
      { quota, status },
      { new: true } // Return the updated document
    );

   

    // Send the updated user role as a JSON response
    res.json(updatedQuota);
  } catch (error) {
    console.error("Error updating Quota:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating Quota" });
  }
});

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      await Quota.findByIdAndDelete(id);

      res.json({ message: "Quota deleted successfully." });
    } catch (error) {
      console.error("Error deleting Quota:", error);
      res.status(500).json({ error: "An error occurred while deleting Quota." });
    }
  });

module.exports = router;
