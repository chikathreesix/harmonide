module.exports = function(grunt){
  grunt.initConfig({
    shell: {
      traceur: {
        command: 'traceur --experimental --out build/main.js src/javascripts/main.js'
      },
      traceur_test:{
        command: 'traceur --experimental --out test/build/util.js test/src/util.js'
      }
    },
    watch: {
      js: {
        files: ['src/javascripts/*.js'],
        tasks: ['shell:traceur'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['src/stylesheets/*.scss'],
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
      }
    },
    sass: {
      dist: {
        files: {
          'build/main.css': 'src/stylesheets/main.scss'
        }
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/stylesheets',
          cssDir: 'build'
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

  grunt.registerTask('default', ['shell:traceur', 'sass']);
}
