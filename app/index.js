'use strict';
const express = require('express');
const bodyParser = require('body-parser');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now()+'.txt')
    }
});

var upload = multer({ storage: storage });

const app = express();

const PORT = process.env.PORT || 8080;

app.use("/", express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/admin', upload.single('file'), function(req, res) {
    res.send('<img src="/uploads/' + req.file.filename + '" />');
});

app.get('/lastcontent', function (req, res) {
    const pages = [
        {type: 'article', id:'123123', title: 'Başlık Başlık Başlık Başlık', summary: 'İçerik İçerik İçerik İçerik'},
        {type: 'news', id:'5432423', title: 'Başlık Başlık Başlık Başlık', summary: 'İçerik İçerik İçerik İçerik'},
        {type: 'document', id:'5432423', title: 'Başlık Başlık Başlık Başlık', summary: 'İçerik İçerik İçerik İçerik'}
    ];

    res.json(pages);
});

app.get('/popularpost', function (req, res) {
    const pages = [
        {id:'1', type: 'article'},
        {id:'2', type: 'article'},
        {id:'3', type: 'article'}
    ];

    res.json(pages);
});

app.get('/article', function (req, res) {
    const pages = [
        {type: 'article', id:'123123', title: 'Başlık Başlık Başlık Başlık', summary: 'İçerik İçerik İçerik İçerik'},
        {type: 'article', id:'5432423', title: 'Başlık Başlık Başlık Başlık', summary: 'İçerik İçerik İçerik İçerik'}
    ];

    res.json(pages);
});

app.listen(PORT, function() {
    console.log('Node app is running on port', PORT);
});