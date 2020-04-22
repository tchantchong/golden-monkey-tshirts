const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const jwt = require('jsonwebtoken');

module.exports = {
    async getProducts(req, resp) {
        let products = await Product.find();
        return resp.json(products);
    },

    async createProduct(req, resp) {
        let verification = verifyJWT(req, resp);
        if (!verification.result) {
            return verification.returnValue;
        }

        try {
            let product = await Product.create(req.body);
            return resp.json(product);
        } catch (err) {
            return resp.status(500).send({error: "Failed to create product."})
        }
    },

    async updateProduct(req, resp) {
        let verification = verifyJWT(req, resp);
        if (!verification.result) {
            return verification.returnValue;
        }
        try {
            let product = await Product.findByIdAndUpdate(
                { _id: req.body.id },
                req.body,
                { new: true });
            return resp.json(product);
        } catch (err) {
            return resp.status(500).send({error: "Failed to update product."});
        }
    },

    async deleteProduct(req,resp) {
        let verification = verifyJWT(req, resp);
        if (!verification.result) {
            return verification.returnValue;
        }

        if (req.body.id === undefined) {
            return resp.status(400).send({error: "Null Id."});
        }
        try {
            await Product.findByIdAndRemove(req.body.id);
        } catch (err) {
            return resp.status(500).send({error: "Failed to delete product."});
        }

        if (await Product.exists({_id: req.body.id})) {
            return resp.status(500).send({error: "Failed to delete product."});
        }
        return resp.status(200).send({status: "Success"});
    }
}

function verifyJWT(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return {
            result: false,
            returnValue: res.status(401).send({ error: 'No token provided.' })
        };
    }
    try {
        let decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.role !== "admin") {
            return {
                result: false,
                returnValue: resp.status(403).send({error: "Only Admins can get edit products."})
            };
        }
        req.decoded = decoded;
        return {
            result: true
        };
    } catch(err) {
        return {
            result: false,
            returnValue: res.status(500).send({ error: 'Failed to authenticate token.' })
        };
    }
}