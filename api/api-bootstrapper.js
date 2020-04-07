const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// App Initialization
const app = express();
requireDir('./src/models');

// DB Initialization
mongoose.connect(
    'mongodb://192.168.99.100:27017/api',
    { useNewUrlParser: true });

app.use('/api', require('./src/routes'));
app.listen(7777);