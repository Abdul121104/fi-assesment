const express = require('express');
const router = express.Router();
const { addProduct, updateQuantity, getProducts } = require('../controllers/productController');
const auth = require('../middleware/auth');

router.post('/products', auth, addProduct);
router.put('/products/:id/quantity', auth, updateQuantity);
router.get('/products', auth, getProducts);

module.exports = router; 