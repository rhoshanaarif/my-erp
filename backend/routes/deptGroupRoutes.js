const express = require("express");
const DepartmentGroup = require("../models/DepartmentGroup");
const router = express.Router();

// GET all department groups
router.get("/", async (req, res) => {
  try {
    const departmentGroups = await DepartmentGroup.find();
    res.json(departmentGroups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { departmentGroup, title, description, status } = req.body;

  try {
    const newDepartmentGroup = new DepartmentGroup({
      departmentGroup,
      title,
      description,
      status,
    });

    const savedDepartmentGroup = await newDepartmentGroup.save();

    res.status(201).json(savedDepartmentGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.put('/:id', async (req, res) => {
    try {
      const updatedDepartmentGroup = await DepartmentGroup.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!updatedDepartmentGroup) {
        return res.status(404).send('Department Group not found');
      }
  
      res.json(updatedDepartmentGroup);
    } catch (error) {
      console.error('Error updating department group:', error);
      res.status(500).send('Server Error');
    }
  });
  
  // Delete a department group by ID
  router.delete('/:id', async (req, res) => {
    try {
      const deletedDepartmentGroup = await DepartmentGroup.findByIdAndRemove(
        req.params.id
      );
  
      if (!deletedDepartmentGroup) {
        return res.status(404).send('Department Group not found');
      }
  
      res.json({ message: 'Department Group deleted' });
    } catch (error) {
      console.error('Error deleting department group:', error);
      res.status(500).send('Server Error');
    }
  });
module.exports = router;
