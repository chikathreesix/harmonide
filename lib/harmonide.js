#!/usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var program = require('commander');
var HarmonideParser = require('./parser');    
var rootDir = path.resolve(__dirname, '..');

var assetFiles = [
  'build/assets/exe.css',
  'build/assets/exe.js',
  'build/assets/harmonide.css',
  'build/assets/harmonide.js',
  'build/assets/traceur.js',
]

function buildHarmonide(files){
  if(!fs.existsSync('build')){
    fs.mkdirSync('build');
  }

  files.forEach(function(file){
    new HarmonideParser(file);
  });

  assetFiles.forEach(function(file){
    var dir = path.dirname(file);
    fs.exists(dir, function(exists){
      var copyFile = function(){
        fs.copy(path.resolve(rootDir, file), file);
      }
      if(!exists){
        fs.mkdirs(dir, copyFile);
      }else{
        copyFile();
      }
    });
  });
}

program
  .version(require('../package.json').version)
  .usage('[command] [file]');

program
  .command('*')
  .description('')
  .action(function(){
    var files = program.args.filter(function (arg) {
      return typeof arg === 'string';
    });
    buildHarmonide(files);
  });

program
  .parse(process.argv);

if(!program.args.length) {
  program.help();
}
