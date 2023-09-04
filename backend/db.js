const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect('mongodb+srv://aravinth:1234@cluster0.q3uv7cw.mongodb.net/erp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectDB;
