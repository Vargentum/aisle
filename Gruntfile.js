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
      assets: '<%= project.app %>/assets',
      styles: '<%= project.src %>/styles/{,*/}*.styl',
      coffee: '<%= project.src %>/scripts/{,*/}*.coffee',
      plugins: '<%= project.src %>/scripts/plugins/{,*/}*.js',
      views: '<%= project.src %>/views/{,*/}*.html'
    },

    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * <%= pkg.url %>\n' +
              ' */\n'
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

    concat: {
      dist: {
        src: ['<%= project.plugins %>'],
        dest: '<%= project.assets %>/scripts/plugins.js'
      },
      options: {
        stripBanners: true,
        nonull: true
      }
    },

    uglify: {
      dist: {
        src: ['<%= project.assets %>/scripts/plugins.js'],
        dest: '<%= project.assets %>/scripts/plugins.min.js'
      },
      options: {
        mangle: true,
        compress: true
      }
    },

    stylus: {
      compile: {
        files: {
             '<%= project.assets %>/styles/core.css': ['<%= project.src %>/styles/core.styl']
        },
        options: {
          paths: [
            '<%= project.assets %>/styles/',
            '<%= project.assets %>/fonts/',
            '<%= project.assets %>/img/'
          ],
          urlfunc: 'data',
          import: ['nib']
        }
      }
    },

    coffee: {
      compile: {
        files: {
          '<%= project.assets %>/scripts/core.js': ['<%= project.coffee %>']
        }
      }
    },

    autoprefixer: {
      single_file: {
        options: {
          browsers: ['last 2 version', 'ie 9']
        },
        src: '<%= project.assets %>/styles/core.css',
        dest: '<%= project.assets %>/styles/core.css'
      }
    },

    includes: {
      files: {
        cwd: '<%= project.src %>/views',
        src: [ '*.html' ],
        dest: '<%= project.app %>',
        options: {
          flatten: true,
          silent: true,
          filenameSuffix: '.html'
        }
      }
    },

    csso: {
      compress: {
        files: {
          '<%= project.assets %>/styles/core.css': ['<%= project.assets %>/styles/core.css']
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    watch: {
      stylus: {
        files: '<%= project.styles %>',
        tasks: ['stylus']
      },
      concat: {
        files: '<%= project.plugins %>',
        tasks: ['concat']
      },
      coffee: {
        files: '<%= project.coffee %>',
        tasks: ['coffee']
      },
      includes: {
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

  

  grunt.registerTask('compile-css', [
    'stylus',
    'autoprefixer',
    'csso'
  ]);
  grunt.registerTask('compile-html', [
    'includes'
  ]);
  grunt.registerTask('compile-js', [
    'concat',
    'uglify',
    'coffee'
  ]);

  grunt.registerTask('build',[
    'compile-css',
    'compile-html',
    'compile-js'
  ]);

  grunt.registerTask('default',['build']);

  grunt.registerTask('server',[
    'build',
    'connect:livereload',
    'open',
    'watch'
  ]);

};
