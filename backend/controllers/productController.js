const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ 
      product_id: product._id,  // Changed from 'id' to 'product_id'
      message: 'Product added successfully' 
    });
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ 
      message: 'Quantity updated',
      quantity: product.quantity , // Added this to match test expectations
      // Keeping product in response if other parts of your app need it
      product 
    });
  } catch (err) {
    res.status(400).json({ message: 'Error updating quantity', error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Remove pagination parameters
    res.json(products); // Return direct array of products
  } catch (err) {
    res.status(400).json({ message: 'Error fetching products', error: err.message });
  }
};