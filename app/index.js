'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        //console.log("ext: "+ext);

        if(ext !== '.html'){
            cb('Only html files are allowed!', false);
        }else{
            cb(null, true);
        }
    }}).single('file');

const check_upload = function (req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            res.send(err);
        }else{
            next();
        }

    });
};

const app = express();

const PORT = process.env.PORT || 8080;

app.use("/", express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/admin', check_upload, function (req, res) {
    console.log("File uploaded successfully");
    res.send('success');
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