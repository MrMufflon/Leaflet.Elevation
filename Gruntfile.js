'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all: {
                src: ['dist/**/*']
            }
        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name%>-<%= pkg.version%>.src.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version%>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version%>.css': ['tmp/css/themes/lime.min.css', 'tmp/css/themes/steelblue.min.css', 'tmp/css/themes/purple.min.css'],
                    'src/css/L.Control.Elevation.css': ['src/css/themes/lime.css', 'src/css/themes/steelblue.css', 'src/css/themes/purple.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'dist/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/'
            }
        },
        jshint: {
            // define the files to lint
            files: ['src/**/*.js'],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    console: true,
                    module: true
                }
            }
        },
        less: {
            development: {
                files: {
                    "src/css/themes/lime.css": "src/css/themes/lime.less",
                    "src/css/themes/purple.css": "src/css/themes/purple.less",
                    "src/css/themes/steelblue.css": "src/css/themes/steelblue.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "tmp/css/themes/lime.min.css": "src/css/themes/lime.less",
                    "tmp/css/themes/purple.min.css": "src/css/themes/purple.less",
                    "tmp/css/themes/steelblue.min.css": "src/css/themes/steelblue.less"
                }
            }
        },
        svg2png: {
            all: {
                files: [{
                    src: ['src/images/*.svg'],
                    dest: 'dist/images/'
                }]
            }
        },
        jasmine: {
            pivotal: {
                src: [
                    'src/**/*.js'
                ],
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js',
                    vendor: [
                        'http://cdn.leafletjs.com/leaflet-0.7.2/leaflet-src.js',
                        './lib/leaflet-gpx/gpx.js',
                        'http://d3js.org/d3.v3.js'
                    ],
                    '--local-to-remote-url-access': true
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'spec'
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-svg2png');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'jshint', 'connect', 'jasmine', 'concat', 'uglify', 'less', 'cssmin', 'svg2png']);

    grunt.registerTask('test', ['connect', 'jasmine']);


};