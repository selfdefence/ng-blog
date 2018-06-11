module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            libs:{
                files: [
                    {src: ['bower_components/angular/angular.min.js'], dest: 'dist/assets/js/angular.min.js'},
                    {src: ['bower_components/angular-aria/angular-aria.min.js'], dest: 'dist/assets/js/angular-aria.min.js'},
                    {src: ['bower_components/angular-animate/angular-animate.min.js'], dest: 'dist/assets/js/angular-animate.min.js'},
                    {src: ['bower_components/angular-messages/angular-messages.min.js'], dest: 'dist/assets/js/angular-messages.min.js'},
                    {src: ['bower_components/angular-material/angular-material.min.js'], dest: 'dist/assets/js/angular-material.min.js'},
                    {src: ['bower_components/angular-ui-router/release/angular-ui-router.min.js'], dest: 'dist/assets/js/angular-ui-router.min.js'}
                ]
            },
            css: {
                src: 'bower_components/angular-material/angular-material.css', dest: 'dist/assets/css/angular-material.css'
            }
        },
        concat: { //uygulama js dosyalarını birleştir
            options: {
                separator: ';'
            },
            modules: {
                src: 'src/modules/**/*.js',
                dest: 'temp/<%= pkg.name %>.modules.js'
            },
            controllers: {
                src: 'src/controllers/**/*.js',
                dest: 'temp/<%= pkg.name %>.controllers.js'
            },
            services:{
                src: 'src/services/**/*.js',
                dest: 'temp/<%= pkg.name %>.services.js'
            },
            routes:{
                src: 'src/routes/**/*.js',
                dest: 'temp/<%= pkg.name %>.routers.js'
            },
            directives:{
                src: 'src/directives/**/*.js',
                dest: 'temp/<%= pkg.name %>.directives.js'
            },
            dist: {
                src: ['src/app.js','temp/<%= pkg.name %>.modules.js', 'temp/<%= pkg.name %>.controllers.js', 'temp/<%= pkg.name %>.services.js', 'temp/<%= pkg.name %>.routers.js', 'temp/<%= pkg.name %>.directives.js'],
                dest: 'temp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: { //temp e gelen tüm js dosyalarını minify et
                banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
            },
            dist: {
                files: {
                   'dist/assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['partials/**/*.html', '*.html'],
                    dest: 'dist'
                }]
            }
        },
        cssmin:{ //tüm css leri burada minify et
            target:{
                files: {
                    'dist/assets/css/<%= pkg.name %>.css': ['src/assets/css/app.css']
                }
            }
        },
        jshint: {
            // define the files to lint
            files: ['Gruntfile.js', 'src/**/*.js'],
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        clean:{
            temp: ['temp/']
        },
        'http-server':{
            dev:{
                root: '.',
                port: '8080',
                host: '0.0.0.0',
                cache: 10,
                showDir : false,
                autoIndex: false,
                ext: "html",
                openBrowser : false,
                runInBackground: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('default', ["jshint", "copy", "concat", "uglify", "htmlmin", "cssmin", "clean", "http-server", "watch"]);
};
