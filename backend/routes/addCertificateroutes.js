const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Certificate = require('../models/Certificate'); // Assuming you have a Certificate model defined

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('certificate'), async (req, res) => {
  try {
    const { student, type } = req.body;
    const fileBuffer = req.file.buffer;

    // Check if a certificate with the same student and type exists
    const existingCertificate = await Certificate.findOne({ student, type });

    if (existingCertificate) {
      // Update the fileUrl of the existing certificate
      const uploadDirectory = 'D:/certificate_uploads';
      const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
      const filePath = path.join(uploadDirectory, uniqueFilename);
      
      fs.writeFileSync(filePath, fileBuffer);
      
      existingCertificate.fileUrl = filePath;
      await existingCertificate.save();

      res.status(200).json({ message: 'Certificate file updated successfully' });
    } else {
      // Create a new certificate and save it to the database
      const uploadDirectory = 'D:/certificate_uploads';
      const uniqueFilename = `${Date.now()}_${req.file.originalname}`;
      const filePath = path.join(uploadDirectory, uniqueFilename);

      fs.writeFileSync(filePath, fileBuffer);

      const certificate = new Certificate({
        student,
        type,
        fileUrl: filePath
      });
      await certificate.save();

      res.status(201).json({ message: 'Certificate uploaded successfully' });
    }
  } catch (error) {
    console.error('Error uploading certificate:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/', async (req, res) => {
    try {
      const { student, type } = req.query;
  
      // Check if a certificate exists for the specified student and type
      const certificate = await Certificate.findOne({ student, type });
  
      if (certificate) {
        res.status(200).json({ fileUrl: certificate.fileUrl });
      } else {
        res.status(404).json({ message: 'No document available' });
      }
    } catch (error) {
      console.error('Error fetching certificate:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join( 'D:/certificate_uploads', filename); // Correct the path accordingly
    res.sendFile(filename);
  });

module.exports = router;