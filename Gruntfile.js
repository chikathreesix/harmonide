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

  grunt.registerTask('default', ['shell:traceur', 'compass', 'parse']);

  grunt.registerTask('parse', function(){
    var fs = require('fs'),
        hljs = require('highlight.js'),
        ejs = require('ejs'),
        marked = require('marked'),
        dir = 'drafts',
        files = fs.readdirSync(dir),
        renderer = new marked.Renderer();

    renderer.code = function(code, language){
      return '<pre><code class="hljs ' + language + '">' + 
              hljs.highlight(language, code).value +
              '</code></pre>';
    }

    files.forEach(function(file){
      if(!file.match(/\.md$/)){
        return;
      }

      var data = fs.readFileSync(dir + '/' + file, 'utf8'),
          fileName = file.replace('.md', ''),
          template = fs.readFileSync('src/index.html.ejs', 'utf8'),
          slides = [];

      data.split(/-{5,}/).forEach(function(pageData){
        slides.push({
          content: marked(pageData, { renderer: renderer })
        });
      });

      fs.writeFileSync('build/' + fileName + '.html', ejs.render(template, {slides: slides}));
    });
  });
}
