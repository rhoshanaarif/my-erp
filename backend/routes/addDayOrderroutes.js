const express = require('express');
const router = express.Router();
const DayOrder = require('../models/DayOrder'); // Import your DayOrder model

// Create a new day order
router.post('/', async (req, res) => {
  try {
    const newDayOrder = new DayOrder(req.body);
    const savedDayOrder = await newDayOrder.save();
    res.status(201).json(savedDayOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all day orders
router.get('/', async (req, res) => {
  try {
    const dayOrders = await DayOrder.find();
    res.status(200).json(dayOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { dayorder, day, totalperiod, periods } = req.body;
  
    try {
      // Assuming you have a database model named "DayOrder"
      // Replace the following logic with your actual database update operation
      const updatedDayOrder = await DayOrder.findByIdAndUpdate(
        id,
        { dayorder: dayorder, day: day, totalperiod: totalperiod, periods: periods },
        { new: true }
      );
  
      if (!updatedDayOrder) {
        return res.status(404).json({ error: 'Day order not found' });
      }
  
      return res.json(updatedDayOrder);
    } catch (error) {
      console.error('Error updating day order:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  router.delete('/:id', async (req, res) => {
    try {
      const deletedDayOrder = await DayOrder.findByIdAndDelete(req.params.id);
      if (!deletedDayOrder) {
        return res.status(404).json({ message: 'Day order not found' });
      }
      res.status(200).json({ message: 'Day order deleted successfully' });
    } catch (error) {
      console.error('Error deleting day order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
