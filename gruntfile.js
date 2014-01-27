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
                    src: ['**/*.{md,hbs,html}'],
                    dest: '<%= dest %>'
                }]
            }
        },

        clean: {
            html: ['dist/**/*.html'],
            css: ['dist/static/main.css']
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

        connect: {
            dev: {
                options: {
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

            /*grunt: {
                files: ['Gruntfile.js']
            },*/

            less: {
                files: ['src/**/*.less'],
                tasks: ['less']
            },

            assemble: {
                files: ['src/**/*.{hbs,html,md}'],
                tasks: ['assemble']
            }
        }
    });

    grunt.registerTask('build', ['clean', 'less', 'assemble']);
    grunt.registerTask('default', ['build', 'connect:dev', 'watch']);

    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};