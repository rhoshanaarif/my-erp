const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// Add a new department
router.post("/", (req, res) => {
  // Retrieve department name from the request body
  const {
    name,
    category,
    departmentType,
    institution,
    semester,
    duration,
    numberOfSeats,
    status,
  } = req.body;
  console.log(name);

  // Create a new department instance
  const newDepartment = new Department({
    name,
    category,
    departmentType,
    institution,
    semester,
    duration,
    numberOfSeats,
    status,
  });

  // Save the department to the database
  newDepartment
    .save()
    .then(() => {
      // Example response object
      const response = {
        success: true,
        message: "Department added successfully",
      };
      res.json(response);
    })
    .catch((error) => {
      console.error("Failed to add department:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add department" });
    });
});

router.get("/", (req, res) => {
  Department.find()
    .then((departments) => {
      res.json(departments);
    })
    .catch((error) => {
      console.error("Failed to retrieve departments:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve departments" });
    });
});

// Update a department
// Update a department
router.put("/name/:_id", (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;
  console.log(_id, name);

  Department.findByIdAndUpdate(_id, { name }, { new: true })
    .then((updatedDepartment) => {
      if (!updatedDepartment) {
        return res
          .status(404)
          .json({ success: false, message: "Department not found" });
      }
      res.json({
        success: true,
        message: "Department name updated successfully",
        department: updatedDepartment,
      });
    })
    .catch((error) => {
      console.error("Failed to update department name:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update department name" });
    });
});

router.put("/addclass/:departmentId", async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const classId = req.body.classId;

    // Find the department by ID and update its classes column
    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      { $push: { classes: classId } },
      { new: true }
    );

    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update department." });
  }
});
// Update classes assigned to a department
router.put("/classes/:deptId", (req, res) => {
  const { deptId } = req.params;
  const { classes } = req.body;

  Department.findByIdAndUpdate(deptId, { classes }, { new: true })
    .populate("classes") // Populate the "classes" field to get class details
    .then((updatedDepartment) => {
      if (!updatedDepartment) {
        return res
          .status(404)
          .json({ success: false, message: "Department not found" });
      }
      res.json({
        success: true,
        message: "Department classes updated successfully",
        department: updatedDepartment,
      });
      console.log("department classes updated successfully ");
    })
    .catch((error) => {
      console.error("Failed to update department classes:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update department classes",
      });
    });
});

// Delete a department
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;

  Department.findByIdAndRemove(_id)
    .then((deletedDepartment) => {
      if (!deletedDepartment) {
        return res
          .status(404)
          .json({ success: false, message: "Department not found" });
      }
      res.json({
        success: true,
        message: "Department deleted successfully",
        department: deletedDepartment,
      });
    })
    .catch((error) => {
      console.error("Failed to delete department:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete department" });
    });
});

module.exports = router;
