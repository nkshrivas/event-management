// services/productService.js
const Product = require('../models/Product');

// Create a new product
async function createProduct(name, image, price, vendor) {
  try {
    const product = new Product({
      name,
      image,
      price,
      vendor,
    });
    await product.save();
    return product;
  } catch (error) {
    throw error;
  }
}

// Get a list of all products
async function getAllProducts() {
  try {
    const products = await Product.find().populate('vendor', 'name'); // Populate the vendor field with the vendor's name
    return products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
};
