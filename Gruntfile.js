/**
 * Created by Zed on 2015/10/20.
 */
module.exports = function (grunt) {

    var VERSION_TEMPLATE = '/*! <%= pkg.name %> - <%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> by Zed */' +
        '\n\n';


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            all: {
                options: {
                    banner: VERSION_TEMPLATE
                },
                files: {
                    'dist/VolumeSlider.min.js': 'dist/VolumeSlider.js'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src:'VolumeSlider.js',
                        dest: 'dist/'
                    }
                ]
            }
        }
    });


    // https://github.com/gruntjs/grunt-contrib-uglify
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // https://github.com/gruntjs/grunt-contrib-cssmin
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('create', ['uglify', 'copy']);
};