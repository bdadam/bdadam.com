module.exports = function(grunt) {
    grunt.initConfig({
        assets: 'dist/static',
        dest: 'dist',

        assemble: {
            options: {
                assets: "<%= assets %>",
                layout: "layout.hbs",
                partials: "src/templates/partials/**/*.hbs",
                layoutdir: 'src/templates/layouts',
                helpers: ['src/helpers/**.js'],
                dest: '<%= dest %>',
                flatten: true
            },
            dev: {
                options: {
                    flatten: false,
                    dev: true
                },
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: 'src/content/',
                    src: ['**/*.{md,hbs,html,xml}'],
                    dest: '<%= dest %>'
                }]
            }
        },

        rename: {
            rss: {
                src: '<%= dest %>/rss.html',
                dest: '<%= dest %>/rss.xml'
            },
            sitemap: {
                src: '<%= dest %>/sitemap.html',
                dest: '<%= dest %>/sitemap.xml'
            }
        },

        clean: {
            static: ['dist/static/main.{css,js}'],
            xml: ['dist/{rss,sitemap}.xml'],
            html: ['dist/**/*.html', '!dist/google*.html', '!dist/static/**/*.html']
        },

        less: {
            main: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/static/main.css': 'src/less/main.less'
                }
            }
        },

        browserify: {
            dist: {
                options: {
                    transform: ['brfs', 'uglifyify']
                },
                files: {
                    'dist/static/main.js': ['src/js/main.js']
                }
            }
        },

        uncss: {
            options: {
                csspath: '/static/',
                stylesheets: ['main.css'],
                compress: true,
                timeout: 3
            },
            dist: {
                files: {
                    'dist/static/main.min.css': ['dist/**/*.html']
                }
            }
        },

        hashres: {
            options: {
                fileNameFormat: '${name}.${ext}?${hash}',
                renameFiles: false
            },
            dist: {
                options: {
                },
                src: ['dist/static/main.css', 'dist/static/main.js'],
                dest: 'dist/**/*.html'
            }
        },

        connect: {
            dev: {
                options: {
                    hostname: '0.0.0.0',
                    port: 3002,
                    base: 'dist'
                }
            }
        },

        watch: {
            options: {
                livereload: true,
                spawn: false
            },

            less: {
                files: ['src/**/*.less'],
                tasks: ['less', 'copy', 'assemble']
            },

            browserify: {
                files: ['src/js/**/*.js'],
                tasks: ['browserify', 'copy', 'assemble']
            },

            uglifyinlinejs: {
                files: ['src/js/inline/**/*.js'],
                tasks: ['uglify:inlinejs']
            },

            assemble: {
                files: ['src/**/*.{hbs,html,md,xml}'],
                tasks: ['assemble', 'rename', 'htmlmin']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**/*.html'],
                    dest: 'dist',
                    ext: '.html'
                }]
            }
        },

        copy: {
            staticToPartial: {
                files: {
                    'src/templates/partials/main.css.hbs': 'dist/static/main.css',
                    'src/templates/partials/main.js.hbs': 'dist/static/main.js'
                }
            }
        },

        uglify: {
            inlinejs: {
                files: {
                    'src/templates/partials/head-inline.js.hbs': ['src/js/inline/*.js']
                }
            }
        }
    });

    grunt.registerTask('build', ['clean', 'less', 'browserify', 'uglify', 'copy', 'assemble', 'rename', 'htmlmin']);
    grunt.registerTask('default', ['build', 'connect:dev', 'watch']);

    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};