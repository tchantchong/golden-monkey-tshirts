const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    async products(req, resp) {
        let products = await Product.find();
        return resp.json(products);
    },

    async createProduct(req, resp) {
        let product = await Product.create(req.body);
        return resp.json(product);
    },

    async updateProduct(req, resp) {
        let product = await Product.findByIdAndUpdate(
            { _id: req.body.id },
            req.body,
            { new: true });
        return resp.json(product);
    },

    async deleteProduct(req,resp) {
        let id = req.body.id;
        await Product.findByIdAndRemove(id);
        return resp.send();
    }
};