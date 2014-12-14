module.exports = function(grunt){
  grunt.initConfig({
    shell: {
      traceur: {
        command: [
          'traceur --experimental --out build/assets/harmonide.js src/javascripts/harmonide.js',
          'traceur --experimental --out build/assets/exe.js src/javascripts/exe.js'
        ].join('&&')
      },
      traceur_test:{
        command: 'traceur --experimental --out test/build/util.js test/src/util.js'
      }
    },
    watch: {
      js: {
        files: ['src/javascripts/*.js', 'src/javascripts/effects/*.js'],
        tasks: ['shell:traceur'],
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
        tasks: ['shell'],
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

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['shell', 'compass', 'parse']);
  grunt.registerTask('parse', function(){
    var HarmonideParser = require('lib/parser');
    HarmonideParser.parseAll();
  });
}
