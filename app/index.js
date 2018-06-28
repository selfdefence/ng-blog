'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const async = require('async');
const multer  = require('multer');
const moment = require('moment');

const PORT = process.env.PORT || 8080;

app.use("/", express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let database;
let routes;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);

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
            console.log("File uploaded successfully");
            // console.log(JSON.parse(req.body.input));
            // console.log(req.file);
            // // req.model = {};
            req.body = {
                input: JSON.parse(req.body.input),
            };
            console.log(req.body.input);
            req.body.input.model.file_src = req.file.path;

            if(req.body.input === undefined){
                res.writeHead(404, {'Content-Type': undefined});
                res.write("req.body is undefined");
                res.end();
            }

            next();
        }

    });
};

const save_data = function (req, res, next) {
    var params = req.body.input;

    async.waterfall([
        function (cb) {
            database.models.PageType.findAll({ raw: true })
                .then(function (instances) {
                    cb(null, instances);
                });
        },
        function (instances, cb) {
            instances.forEach(function (each) {
                if(each.name === params.selected){
                    cb(null, each.id);
                }
            })
        },
        function (id, cb) {
            if(id === '1' || id === 1){
                cb(null, database.models.Article, id);
            }else if(id === '2' || id === 2){
                cb(null, database.models.News, id);
            }else
                cb(null);
        },
        function (Model, id,  cb) {
            params.model.date = moment(new Date().toISOString()).format("YYYY-MM-DD");
            console.log('before create: ');
            console.log(params.model);

            Model.create(params.model)
                .then(function (instance) {
                    database.models.Page.create({
                        type_id: id,
                        page_id: instance.get().id
                    }).then(function (page_instance) {
                        cb(null);
                    }).catch(function (err) {
                        cb(err);
                    })
                }).catch(function (err) {
                    cb(err);
                })
        }
    ],
    function(err, result){
        if(err){
            console.log("last step");
            console.log(err);

        }else{
            console.log("success!");
        }
        next()
    });
};

async.series([
        function (cb) {
            database = require(__dirname + '/src/database.js');
            database.setup(cb); //Create models
        },
        function (cb) {

            app.get('/', function (req, res) {
                res.sendFile(__dirname + "/index.html");
            });

            app.post('/admin', check_upload, save_data, function (req, res) {
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

            app.get('/post/:id', function (req, res) {
                console.log(req.params.id);

                //**//
                const filePath = __dirname + '/uploads/page.html';

                fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
                    if (!err) {
                        console.log('received data: ' + data);
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(data);
                        res.end();
                    } else {
                        console.log(err);
                        res.send('<b>Error!<b>')
                    }
                });
            });

            cb(null);
        }],
    function (err, result) {
        if(err){
            throw (err);
        }else{
            console.log("index is run");
        }
    });


app.listen(PORT, function() {
    console.log('Node app is running on port', PORT);
});