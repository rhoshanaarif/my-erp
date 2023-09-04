const express = require("express");
const router = express.Router();
const UserRole = require("../models/UserRole");

// Create a new user role
router.post("/", async (req, res) => {
  try {
    const { userRole, status } = req.body;

    const newUserRole = new UserRole({
      userRole,
      status,
    });

    const savedUserRole = await newUserRole.save();
    res.json(savedUserRole);
  } catch (error) {
    console.error("Error creating user role:", error);
    res.status(500).json({ error: "An error occurred while creating user role." });
  }
});

// Fetch all user roles
router.get("/", async (req, res) => {
  try {
    const userRoles = await UserRole.find();
    res.json(userRoles);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    res.status(500).json({ error: "An error occurred while fetching user roles." });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { userRole, status } = req.body;
  
      const updatedUserRole = await UserRole.findByIdAndUpdate(
        id,
        { userRole, status },
        { new: true }
      );

      res.json(updatedUserRole);
      
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "An error occurred while updating user role." });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      await UserRole.findByIdAndDelete(id);
  
      res.json({ message: "User role deleted successfully." });
    } catch (error) {
      console.error("Error deleting user role:", error);
      res.status(500).json({ error: "An error occurred while deleting user role." });
    }
  });
  
module.exports = router;
