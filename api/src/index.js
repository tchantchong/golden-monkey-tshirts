const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// App Initialization
const app = express();
app.use(express.json());
app.use(cors());
require('./configuration');
require('dotenv-safe').config();
requireDir('./models');
requireDir('./controllers');
app.use('/api', require('./routes'));

// DB Initialization
mongoose.connect(
    getMongoDbUrl(),
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Successfully connected to MongoDB.");
    }).catch((error) => {
        console.error(`Failed to connect to MongoDB: ${error}.`);
    }
);

app.listen(global.gConfig.port, () => {
    console.log(`Service running on port ${global.gConfig.port}.`);
});

function getMongoDbUrl() {
    if (process.env.MONGO === undefined) {
        throw "Mongo DB password must be passed in the args for server initialization.";
    }
    return global.gConfig.mongodb.url
        .replace("<username>", global.gConfig.mongodb.username)
        .replace("<password>", process.env.MONGO);
}