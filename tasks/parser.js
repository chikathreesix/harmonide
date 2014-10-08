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
    this._pageOptions = this.parsePageOptions(this._globalOption);

    var dataArr = this._data.split(/\-{5,}\n[^-]*\-{5,}\n\n/);
    dataArr.shift();
    dataArr.forEach(function(pageData, index){
      var option = this._pageOptions[index];
      this._slides.push({
        style: this.getStyle(option),
        content: marked(pageData, { renderer: renderer })
      });
    }.bind(this));

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

  // parse each page's options to an object and remove the string from the data
  parsePageOptions: function(globalOption){
    var regex = /\-{5,}\n([^-]*)\-{5,}\n\n/g;
    var match;
    var options = [];
    var index = 0;
    while(match = regex.exec(this._data)){
      var optionStr = match[0].replace(/\-{5,}\n/g,'');
      options.push(this.parseOption(optionStr));
    }

    return options;
  },

  getStyle: function(option){
    var style = '';
    for(var prop in option){
      if(prop == 'backgroundColor'){
        style += 'background-color:' + option[prop] + ';';
      }
    }
    return style;
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
