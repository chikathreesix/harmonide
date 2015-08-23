module.exports = function(grunt){
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              loose: "all"
            }]
          ]
        },
        files: {
          "build/assets/harmonide.js": ["src/javascripts/harmonide.js"],
          "build/assets/exe.js": ["src/javascripts/exe.js"],
          "test/build/util.js": ["test/src/util.js"],
        }
      }
    },
    watch: {
      js: {
        files: ['src/javascripts/*.js', 'src/javascripts/effects/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['src/stylesheets/*.scss', 'src/stylesheets/effects/*.scss'],
        tasks: ['compass'],
        options: {
          spawn: false,
        }
      },
      test: {
        files: ['src/javascripts/*.js', 'test/src/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        }
      },
      md: {
        files: ['drafts/*.md', 'src/index.html.ejs'],
        tasks: ['parse'],
        options: {
          spawn: false
        }
      }
    },
    sass: {
      dist: {
        files: {
          'build/assets/harmonide.css': 'src/stylesheets/harmonide.scss'
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/stylesheets',
          cssDir: 'build/assets'
        }
      }
    },
    connect: {
      browser: {
        options:{
          port: '9999',
          keepalive: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'compass', 'parse']);
  grunt.registerTask('parse', function(){
    var HarmonideParser = require('./lib/parser');
    HarmonideParser.parseAll('drafts');
  });
}
