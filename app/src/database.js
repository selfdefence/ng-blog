'use strict';
const Sequelize = require('sequelize');
const async = require('async');
const connectionUri = "postgresql://said:000332@localhost:5432/testblog";
const FORCE_DROP = { force:true };
const NO_LOGGING = { logging: false};

function Database() {
    this.models = {};
    this.sequelize = null;
    var that = this;

    this.setup = function (parent_cb) {
        async.series([
                function (cb) {
                    that.connectToDB(cb);
                },
                function (cb) {
                    //cb(null);
                    that.modelDefine(cb);
                },
                function (cb) {
                    //that.dropTables(cb);
                    that.createRelations(cb);
                    //cb(null);
                },
                function (cb) {
                    //cb(null);
                    that.saveModels(cb);
                    //cb(null);
                },
                function (cb) {
                    that.insertInitials(cb);
                }
            ],
            function (err, result) {
                if(err){
                    console.log(err);
                    throw (err);
                }else{
                    console.log("setup process done");
                    parent_cb(null);
                }
            });
    };

    this.connectToDB = function (cb) {

        //Connect to database
        this.sequelize = new Sequelize(connectionUri, {
            define: {
                timestamps: false, // true by default
                underscored: true,
                freezeTableName: true
            }
        });

        this.sequelize
            .authenticate()
            .then(function (){
                console.log('Connection has been established successfully.');
                cb(null, 'connectToDB done');
            })
            .catch(function (err) {
                console.error('Unable to connect to the database:', err);
                cb(err);
            });
    };

    this.modelDefine = function (callback) {
        this.models.Page = this.sequelize.define('page', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },{
            tableName: 'page_list'
        });

        this.models.Article = this.sequelize.define('article', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.TEXT
            },
            file_src: {
                type: Sequelize.TEXT
            },
            date: {
                type: Sequelize.DATEONLY
            },
            writer: {
                type: Sequelize.TEXT
            }
        },{
            tableName: 'article_list'
        });

        this.models.News = this.sequelize.define('news', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.TEXT
            },
            file_src: {
                type: Sequelize.TEXT
            },
            date: {
                type: Sequelize.DATEONLY
            }
        },{
            tableName: 'news_list'
        });

        this.models.PageType = this.sequelize.define('page_types', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            }
        });

        console.log('model_loader done');
        callback(null);
    };

    this.createRelations = function (parent_callback) {
        this.models.Page.belongsTo(this.models.PageType, {foreignKey: 'type_id'});
        this.models.Page.belongsTo(this.models.Article, {foreignKey: 'page_id', onDelete: 'CASCADE', hooks: true}); //
        this.models.Page.belongsTo(this.models.News, {foreignKey: 'page_id', onDelete: 'CASCADE', hooks: true}); //

        // this.models.Article.hasOne(this.models.Page, {foreignKey: 'page_id', onDelete: 'CASCADE', hooks: true});
        // this.models.News.hasOne(this.models.Page, {foreignKey: 'page_id', onDelete: 'CASCADE', hooks: true});

        console.log('createRelations done');
        parent_callback(null);
    };

    this.saveModels = function (parent_callback) {
        var models = this.models;

        async.series([
            function (callback) {
                models.PageType.sync()
                    .then(function () {
                        callback(null, 'PageType model saved');
                    }).catch(function (err) {
                        console.log(err);
                        callback(err);
                    });
            },

            function (callback) {
                models.Article.sync()
                    .then(function () {
                        callback(null, 'Article model saved');
                    }).catch(function (err) {
                        console.log(err);
                        callback(err);
                    });
            },

            function (callback) {
                models.News.sync()
                    .then(function () {
                        callback(null, 'News model saved');
                    }).catch(function (err) {
                        console.log(err);
                        callback(err);
                    });
            },

            function (callback) {
            models.Page.sync()
                .then(function () {
                    callback(null, 'Page model saved');
                }).catch(function (err) {
                    console.log(err);
                    callback(err);
                });
            }],
            function (err, result) {
                if(err){
                    console.log(err);
                    parent_callback(err);
                }else{
                    console.log("saveModels done");
                    parent_callback(null);
                }
            });
    };

    this.insertInitials = function (parent_callback) {
        var pagetype = this.models.PageType;

        this.models.PageType.count()
            .then(function (count) {
                if (count === 0) {
                    var models = [{name: 'article'}, {name: 'news'}, {name: 'document'}];

                    pagetype.bulkCreate(models, { raw: true })
                        .then(function (instance) {
                            console.log(instance.get());
                            parent_callback(null);
                        }).catch(function (err) {
                            console.log(err);
                            parent_callback(null);
                        })
                }else{
                    console.log("Page types are already inserted");
                    parent_callback(null);
                }
            }).catch(function (err) {
                parent_callback(null);
            });
    }
}

module.exports = new Database();