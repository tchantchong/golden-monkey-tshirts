const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/product-controller');
const UserController = require('./controllers/user-controller');

//Products
routes.get('/get-products', ProductController.getProducts);
routes.post('/create-product', ProductController.createProduct);
routes.put('/update-product', ProductController.updateProduct)
routes.delete('/delete-product', ProductController.deleteProduct);

//Users
routes.get('/get-users', UserController.getUsers);
routes.post('/create-user', UserController.createUser);
routes.delete('/delete-user-by-username', UserController.deleteUserByUsername);
routes.get('/authenticate-user', UserController.authenticateUser);
routes.post('/update-user-info', UserController.updateUserInfo);

module.exports = routes;