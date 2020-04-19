const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    async getProducts(req, resp) {
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
        if (req.body.id === undefined) {
            return resp.status(400).send({error: "Null Id."});
        }
        await Product.findByIdAndRemove(req.body.id);

        let product = await Product.findById(req.body.id);
        if (product != undefined) {
            return resp.status(500).send({error: "Product could not be deleted."});
        }
        return resp.status(200).send();
    }
}

function verifyJWT(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ error: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to authenticate token.' });
        }

        if (decoded.role !== "admin") {
            return resp.status(403).send({error: "Only Admins can get edit products."});
        }

        req.decoded = decoded;
    });
}