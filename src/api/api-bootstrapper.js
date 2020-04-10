const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const bodyParser = require('body-parser')

// App Initialization
const app = express();
requireDir('./models');
requireDir('./controllers');

// DB Initialization
mongoose.connect(
    'mongodb://192.168.99.100:27017/api',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json());
app.use('/api', require('./routes'));
app.listen(7777);