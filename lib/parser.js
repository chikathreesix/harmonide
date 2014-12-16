var fs = require('fs');
var path = require('path');
var marked = require('marked');
var hljs = require('highlight.js');
var ejs = require('ejs');
var renderer = new marked.Renderer();

renderer.code = function(code, language){
  var className = 'hljs ' + language;
  var attr = '';

  if(language == 'js' || language == 'jses6'){
    className += ' exe';
    attr += ' data-language="' + language + '"';
  }else if(language == 'html'){
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  return '<pre><code class="' + className + '"' + attr + '>' + code + '</code></pre>';
}

function HarmonideParser(){
  this.init.apply(this, arguments);
}
HarmonideParser.parseAll = function(dir){
  var files = fs.readdirSync(dir);
  files.forEach(function(file){
    new HarmonideParser(path.resolve(dir, file));
  });
}
HarmonideParser.prototype = {
  init : function(file){
    if(!file.match(/\.md$/)){
      return;
    }

    this._data = fs.readFileSync(file, 'utf8');
    this._fileName = file;
    this._slides = [];

    this._globalOption = this.parseGlobalOption();

    var dataArr = this.parseContent(this._data);

    var i = 0;
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

    var template = fs.readFileSync('layouts/default.html.ejs', 'utf8');
    fs.writeFileSync('build/' + path.basename(this._fileName).replace('.md', '.html'), ejs.render(template, {slides: this._slides}));
  },

  parseContent: function(data){
    var arr = [];
    var currentStr = null;
    var isCodeBlock = false;
    var isParsingOption = false;

    data.split('\n').forEach(function(line){
      // Check separator
      if(!isCodeBlock && line.match(/^\-{5,}$/)){
        isParsingOption = !isParsingOption;
        arr.push('');
        return;
      }

      if(arr.length == 0 && line.length != 0){
        throw new Error('parse error : ' + line);
      }

      // Parse option
      if(isParsingOption){
        // validate option
        if(line.match(/[^:]+:.*/)){
          arr[arr.length - 1] += line + '\n';
        }else{
          throw new Error('option parse error : ' + line);
        }
      }
      // Parse content
      else{
        if(line.match(/```/)){
          isCodeBlock = !isCodeBlock;
        }
        arr[arr.length - 1] += line + '\n';
      }
    });
    return arr;
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
      if(str.length == 0){
        return;
      }

      var match = str.match(/(.*?):(.*)/);
      if(match[1] == null || match[2] == null){
        throw new Error('parse error at ' + optionStr);
      }

      option[match[1].trim()] = match[2].trim();
    });
  
    return option;
  },

  // parse global options to an object and remove the string from the data
  parseGlobalOption : function(){
    var dataArr = this._data.split('\n');
    var option = {};
    while(dataArr.length > 0){
      var str = dataArr.shift();
      var match = str.match(/(.*?):(.*)/);
      if(!match){
        dataArr.unshift(str);
        break;
      }
      option[match[1].trim()] = match[2].trim();
    }

    this._data = dataArr.join('\n');
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
          var url;
          if(option[prop].match(/^http[s]*:\/\//)){
            url = option[prop];
          }else{
            url = 'assets/' + option[prop];
          }
          style += ' background-image:url("' + url + '");';
          break;
        case 'color':
          style += ' color:' + option[prop] + ';';
          break;
      }
    }
    return style;
  },

  getClassName: function(option){
    var className = '';
    for(var prop in option){
      switch(prop){
        case 'align':
          className += ' align-' + option[prop] + '';
          break;
        case 'type':
          className += ' type-' + option[prop] + '';
          break;
      }
    }
    return className;
  }
};

module.exports = HarmonideParser;
