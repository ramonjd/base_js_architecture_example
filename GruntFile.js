'use strict';
/*

Tasks: 

* set locale 
grunt --locale=XX (it, fr, it, en, de)

for various markets
		
	download bower	
	copy main.js and config.js

	config for sass files?
	compile sass
*/




/* VARS --------------------------------------------------------------- */
var path = require('path'),

validLocales = ['de_DE', 'de_AT'];



module.exports = function(grunt) {

/* IMPORT --------------------------------------------------------------- */
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-smushit');
	grunt.loadNpmTasks('grunt-injector');
	grunt.loadNpmTasks('grunt-contrib-requirejs');


/* CONFIG / TASKS --------------------------------------------------------------- */



	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		loc : validLocales.indexOf(grunt.option('locale')) === -1 ? validLocales[0] : grunt.option('locale'),

		bower: {
            install: {
                options: {
                    targetDir: 'web/webroot/js/lib/',                 
		            verbose: true,
                    cleanTargetDir: true,
                    bowerOptions: {
                        forceLatest: true
                    }
                }
            }
        },

     	copy: {
     		default : {
     			files : [
     				{
                        expand: true,
                        // just copy the files *
                        src: ['config/<%= loc  %>/*'],
                        dest: 'web/webroot/js/',
                        // just bring across the files, not the dirs
                        flatten: true,
                        filter: 'isFile'	
     				}
     			]
     		}
     	},	

		injector: {
			options: {
				template: 'web/webroot/js/main.js',
				starttag: '/** tagstart */',
				endtag: '/** tagend */',
				transform: function (file) {	
					var _line = '\'' + path.basename(file).split('.')[0] + '\' : \'' + file + '\',';
					grunt.log.writeln('Adding ' + _line + ' to main.js');			
					return _line;
				},
          		ignorePath: 'web/webroot/'
			},
		    local_dependencies: {
		      files: {
		        'web/webroot/js/main.js': ['web/webroot/js/lib/**/*.js'],
		      }
		    }

		}

	});	


/* TASK DEFS --------------------------------------------------------------- */
    grunt.registerTask('setup', 'Default setup', function() { 
    	grunt.log.writeln('Getting bower packages and copying locale files');
    	grunt.task.run(['bower:install', 'copy:default']);
  	});

    grunt.registerTask('default', 'Default build', function() { 
    	grunt.log.writeln('Running default build and setup');
    	grunt.task.run([]);
  	});

};