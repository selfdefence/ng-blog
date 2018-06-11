'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var PORT = process.env.PORT || 8080;

app.use("/", express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, function() {
    console.log('Node app is running on port', PORT);
});