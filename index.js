const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file (if present)
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/auth', authRoutes);
app.use("/product",productRoutes)


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
