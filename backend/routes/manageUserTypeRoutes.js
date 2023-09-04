const express = require("express");
const router = express.Router();
const UserType = require("../models/UserType");

// GET all user types
router.get("/", async (req, res) => {
  try {
    const userTypes = await UserType.find();
    res.json(userTypes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user types" });
  }
});

// POST a new user type
router.post("/", async (req, res) => {
  try {
    const { userRole, roleType, status } = req.body;
    const newUserType = new UserType({ userRole, roleType, status });
    const savedUserType = await newUserType.save();
    res.json(savedUserType);
  }catch (error) {
    console.error("Error creating user type:", error);
    res.status(500).json({ error: "An error occurred while creating user type." });
  }
});
// PUT update a user type by ID
router.put("/:id", async (req, res) => {
  try {
    const { userRole, roleType, status } = req.body;
    const updatedUserType = await UserType.findByIdAndUpdate(
      req.params.id,
      {
        userRole,
        roleType,
        status
      },
      { new: true }
    );

    if (!updatedUserType) {
      return res.status(404).json({ error: "User type not found" });
    }

    res.json(updatedUserType);
  } catch (error) {
    console.error("Error updating user type:", error);
    res.status(500).json({ error: "An error occurred while updating user type." });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedUserType = await UserType.findByIdAndDelete(req.params.id);
    if (!deletedUserType) {
      return res.status(404).json({ error: "User type not found" });
    }
    res.json({ message: "User type deleted successfully" });
  } catch (error) {
    console.error("Error deleting user type:", error);
    res.status(500).json({ error: "An error occurred while deleting user type." });
  }
});
module.exports = router;
