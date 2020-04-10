const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    }
});

mongoose.model('Product', ProductSchema);