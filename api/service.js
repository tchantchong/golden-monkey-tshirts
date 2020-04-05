const express = require('express');
const service = express();

//Routes
service.get("/", (req, resp) => {
    resp.send("Welcome to Golden Monkey T-Shirts Online Store");
});

service.listen(7777);