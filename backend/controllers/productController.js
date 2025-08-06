const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ 
      product_id: product._id,
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
    // ye test.py mai paramenter manga hai isliye return kiya hai 
    res.json({ 
      message: 'Quantity updated',
      quantity: product.quantity ,
      product 
    });
  } catch (err) {
    res.status(400).json({ message: 'Error updating quantity', error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching products', error: err.message });
  }
};
