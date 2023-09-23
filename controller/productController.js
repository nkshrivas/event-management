const productService = require('../service/productService');
const multer = require('multer');

// Create a new product
const upload = multer(); // Initialize multer
async function createProduct(req, res) {
  try {
    const { name, price } = req.body;
    console.log(req.body)

    const vendor = req.user; // Get the vendor (user) ID from the authenticated user

    // You can access the uploaded image file from req.file if you used multer for file upload
    const image = req.file;

    const product = await productService.createProduct(name, image, price, vendor);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Get a list of all products
async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
};
