var fs = require('fs');
var marked = require('marked');
var hljs = require('highlight.js');
var ejs = require('ejs');
var renderer = new marked.Renderer();
var dir = 'drafts';

renderer.code = function(code, language){
  return '<pre><code class="hljs ' + language + ' exe" data-language="' + language + '">' + code + '</code></pre>';
}

function FileParser(){
  this.init.apply(this, arguments);
}
FileParser.prototype = {
  init : function(file){
    if(!file.match(/\.md$/)){
      return;
    }

    this._data = fs.readFileSync(dir + '/' + file, 'utf8');
    this._fileName = file.replace('.md', '');
    this._slides = [];

    this._globalOption = this.parseGlobalOption();

    var dataArr = this._data.split(/\-{5,}\n/);
    var i = 0;
    dataArr.shift();

    while(i < dataArr.length - 1){
      var option = this.parseOption(dataArr[i], this._globalOption);
      var mdStr = dataArr[++i];

      this._slides.push({
        style: this.getStyle(option),
        className: this.getClassName(option),
        content: marked(mdStr, { renderer: renderer })
      });

      i++;
    }

    var template = fs.readFileSync('src/index.html.ejs', 'utf8');
    fs.writeFileSync('build/' + this._fileName + '.html', ejs.render(template, {slides: this._slides}));
  },

  // parse options from a string to an object
  parseOption : function(optionStr, globalOption){
    var option = {};

    if(globalOption){
      for(var prop in globalOption){
        option[prop] = globalOption[prop];
      }
    }

    optionStr.split('\n').forEach(function(str){
      var keyValue = str.split(':');
      if(keyValue[0] != null && keyValue[1] != null){
        option[keyValue[0].trim()] = keyValue[1].trim();
      }
    });
  
    return option;
  },

  // parse global options to an object and remove the string from the data
  parseGlobalOption : function(){
    var match = this._data.match(/\*{5,}\n([^\*]*)\*{5,}/);
    var option = this.parseOption(match[1]);
    this._data = this._data.replace(match[0], '');

    return option;
  },

  getStyle: function(option){
    var style = '';
    for(var prop in option){
      switch(prop){
        case 'backgroundColor':
          style += ' background-color:' + option[prop] + ';';
          break;
        case 'backgroundImage':
          style += ' background-image:url("assets/' + option[prop] + '");';
          break;
      }
    }
    return style;
  },

  getClassName: function(option){
    var className = '';
    for(var prop in option){
      if(prop == 'align'){
        className += ' align-' + option[prop] + '';
      }
    }
    return className;
  }
};

module.exports = function(grunt){
  grunt.registerTask('parse', function(){
    var files = fs.readdirSync(dir);

    files.forEach(function(file){
      new FileParser(file);
    });
  });
};
