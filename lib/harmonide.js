#!/usr/bin/env node

var fs = require('fs-extra');
var path = require('path');
var program = require('commander');
var HarmonideParser = require('./parser');    
var rootDir = path.resolve(__dirname, '..');

function buildHarmonide(files, options){
  if(!fs.existsSync('build')){
    fs.mkdirSync('build');
  }

  files.forEach(function(file){
    new HarmonideParser(file);
  });

  initHarmonideFiles();
}

function initHarmonideFiles(){
  var assetFiles = [
    'build/assets/exe.css',
    'build/assets/exe.js',
    'build/assets/harmonide.css',
    'build/assets/harmonide.js',
    'build/assets/traceur.js',
  ];

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
  .command('init')
  .description('Prepare build directory')
  .action(function(){
    initHarmonideFiles();
  });

program
  .command('watch')
  .description('Watch for changes')
  .action(function () {
    var file = program.args[0];
    console.log('Watching for changes: "' + file + '"');
    fs.watchFile(file, { persistent: true, interval: 100 }, function () {
      console.log('File "' + file + '" changed at ' + new Date());
      buildHarmonide([file]);
    });
  });

program
  .command('build')
  .description('Build your slide')
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
