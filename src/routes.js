const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/product-controller');

//Routes
routes.get('/products', ProductController.products);
routes.post('/create-product', ProductController.createProduct);
routes.put('/update-product', ProductController.updateProduct)
routes.delete('/delete-product', ProductController.deleteProduct);

module.exports = routes;