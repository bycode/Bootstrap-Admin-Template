'use strict';
function getTask(name) {
    return require('./src/tasks/' + name + '.js');
}
module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt, {
        pattern: [
            'grunt-*',
            'assemble*'
        ]
    });

    // Project configuration.
    grunt.initConfig({

        // Project Metadata
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readYAML('_config.yml'),

        banner: '/**\n' +
            '* Metis - <%=pkg.name %> v<%= pkg.version %>\n' +
            '* Author : <%= pkg.author %> \n' +
            '* Copyright <%= grunt.template.today("yyyy") %>\n' +
            '* Licensed under <%= pkg.licenses.type %> (<%= pkg.licenses.url %>)\n' +
            '*/\n',

        clean: getTask('clean'),

        copy: getTask('copy'),

        less: getTask('less'),

        concat: getTask('concat'),
		     
        uglify: getTask('uglify'),

        /**
         * Lint JavaScript
         */
        jshint: getTask('jshint'),

        /**
         * Build HTML from templates and data
         */
        assemble: getTask('assemble'),

        modernizr: getTask('modernizr'),

        watch: getTask('watch'),

        connect: getTask('connect')

    });

    
        // JS distribution task.
    grunt.registerTask('dist-js', ['modernizr', 'concat', 'uglify']);


    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'copy', 'less', 'dist-js']);

    grunt.registerTask('server', ['connect:livereload', 'watch']);
    
    
    // Default task.
    //grunt.registerTask('default', ['test', 'dist']);

    grunt.registerTask('default', ['dist', 'assemble']);
    
};