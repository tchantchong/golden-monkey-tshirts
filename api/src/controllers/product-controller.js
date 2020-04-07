const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    async products(req, resp) {
        const products = await Product.find();

        return resp.json(products);
    },

    async createProduct(req, resp) {
        let product = await Product.create({
            id: "1234",
            description: "custom description",
            name: "names",
            price: 123.13
        });

        return resp.json(product);
    },

    async deleteProduct(req,resp) {
        let id = req["id"];

        await Product.findByIdAndRemove("5e8a93a9c3401a3e5887791c");
    }
};