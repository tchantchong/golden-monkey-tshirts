const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/product-controller');

//Routes
routes.get('/products', ProductController.products);
routes.get('/create-product', ProductController.createProduct);
routes.get('/delete-product', ProductController.deleteProduct);

module.exports = routes;