const express = require("express");
const router = express.Router();
const AccountNumber = require("../models/AccountNumber");

// Create a new user role
router.post("/", async (req, res) => {
  try {
    const { accountNumber,accountName, status } = req.body;

    const newAccount = new AccountNumber({
        accountNumber,accountName, status
    });

    const savedAccount = await newAccount.save();
    res.json(savedAccount);
  } catch (error) {
    console.error("Error creating account no:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating account no." });
  }
});

// Fetch all user roles
router.get("/", async (req, res) => {
  try {
    const accounts = await AccountNumber.find();
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching acc number:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching acc number." });
  }
});

// PUT Route for Updating User Role
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { accountNumber,accountName, status } = req.body;

    // Find the user role by ID and update it
    const updatedAccount = await AccountNumber.findByIdAndUpdate(
      id,
      { accountNumber,accountName, status },
      { new: true } 
    );
    // Send the updated user role as a JSON response
    res.json(updatedAccount);
  } catch (error) {
    console.error("Error account number:", error);
    res
      .status(500)
      .json({ error: "An error occurred while account number" });
  }
});

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      await AccountNumber.findByIdAndDelete(id);

      res.json({ message: "Quota deleted successfully." });
    } catch (error) {
      console.error("Error deleting Quota:", error);
      res.status(500).json({ error: "An error occurred while deleting Quota." });
    }
  });

module.exports = router;
