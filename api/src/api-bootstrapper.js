const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// App Initialization
const app = express();
app.use(express.json());
app.use(cors());
requireDir('./models');
requireDir('./controllers');
app.use('/api', require('./routes'));

// DB Initialization
mongoose.connect(
    'mongodb://192.168.99.100:27017/api',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
app.listen(7777);