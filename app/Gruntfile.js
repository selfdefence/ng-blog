module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
            dist: {
                src: ['src/app.js','temp/<%= pkg.name %>.modules.js', 'temp/<%= pkg.name %>.controllers.js', 'temp/<%= pkg.name %>.services.js', 'temp/<%= pkg.name %>.routers.js'],
                dest: 'temp/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: { //temp e gelen tüm js dosyalarını minify et
                banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
            },
            dist: {
                files: {
                   'dist/<%= pkg.name %>.js': ['<%= concat.dist.dest %>']
                }
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

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('default', ["jshint", "concat", "uglify", "cssmin", "clean", "http-server", "watch"]);
};
