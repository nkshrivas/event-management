// routes/product.js
const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const checkVendor = require('../middlewares/authMiddleware');

// Create a new product (requires authentication)
router.post('/',  productController.createProduct);

// Get a list of all products
router.get('/', productController.getAllProducts);

module.exports = router;
