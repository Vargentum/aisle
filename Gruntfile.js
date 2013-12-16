'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      src: 'src',
      app: 'app',
      temp: 'temp',
      styles: '<%= project.src %>/styles/app.scss',
      views: '<%= project.src %>/views/**'
    },

    connect: {
      options: {
        port: 9000,
        hostname: '*'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'app')];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

        includes: {
      files: {
        cwd: '<%= project.src %>/views',
        src: [ '**.html' ],
        dest: '<%= project.app %>',
        options: {
          flatten: true,
          silent: true,
          filenameSuffix: '.html'
        }
      }
    },

    sass: {
      options: {
        includePaths: ['<%= project.app %>/bower_components/foundation/scss']
      },
      dist: {
        files: {
          '<%= project.temp %>/temp.css': '<%= project.styles %>'
        }        
      }
    },

    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 version', 'ie 9']
        },
        src: '<%= project.temp %>/temp.css',
        dest: '<%= project.app %>/css/app.css'
      }
    },

    csso: {
      compress: {
        files: {
          '<%= project.app %>/css/app.min.css': ['<%= project.app %>/css/app.css']
        }
      }
    },


    watch: {
      scss: {
        files: '<%= project.src %>/styles/**',
        tasks: ['sass','autoprefixer','csso']
      },
      views: {
        files: '<%= project.views %>',
        tasks: ['includes']
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/**'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'sass',
    'autoprefixer',
    'csso',
    'includes',
    'connect:livereload',
    'open',
    'watch'
  ]);
};