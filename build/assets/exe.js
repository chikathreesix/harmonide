(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.exe = {
  executor: null,

  init: function init(initCb) {
    this.executor = new CodeExecutor(initCb);
  },

  log: function log(index, content) {
    this.executor.execute(index, content);
  }
};

var CodeExecutor = (function () {
  function CodeExecutor(initCb) {
    var _this = this;

    _classCallCheck(this, CodeExecutor);

    this._codeBlocks = [];

    var readyPromise = new Promise(function (resolve, reject) {
      if (document.readyState == "complete" || document.readyState == "loaded") {
        resolve();
        return;
      }

      window.addEventListener('DOMContentLoaded', function () {
        resolve();
      }, false);
    });

    readyPromise.then(function () {
      var codeElems = document.querySelectorAll('pre code.exe');
      Array.prototype.forEach.call(codeElems, function (elem, index) {
        _this._codeBlocks.push(new CodeBlock(elem, index));
      });
      initCb();
    });
  }

  CodeExecutor.prototype.execute = function execute(index, content) {
    var codeBlock = this._codeBlocks[index];
    codeBlock.execute(content);
  };

  return CodeExecutor;
})();

var CodeBlock = (function () {
  function CodeBlock(elem, index) {
    _classCallCheck(this, CodeBlock);

    this._index = index;
    this._elem = elem;
    this._code = elem.innerHTML;
    this._language = elem.dataset.language;
    this._isOpen = false;
    this._btnText = { open: 'Run', close: 'close' };

    if (this._language == 'js' || this._language == 'jses6') {
      this.replaceJSCode();
    }
    this.createElements();
  }

  CodeBlock.prototype.replaceJSCode = function replaceJSCode() {
    this._code = this._code.replace(/console\.log\((.*)\)/g, "exe.log(" + this._index + ", $1)").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  CodeBlock.prototype.createElements = function createElements() {
    var preElem = this._elem.parentNode;
    this._container = document.createElement('div');
    this._consoleElem = document.createElement('div');
    this._btnElem = document.createElement('div');

    this._container.className = 'exe-container';
    this._consoleElem.className = 'exe-console';
    this._btnElem.className = 'exe-btn';
    this._btnElem.innerHTML = this._btnText.open;

    preElem.parentNode.insertBefore(this._container, preElem);
    this._container.appendChild(this._consoleElem);
    this._container.appendChild(this._btnElem);
    this._container.insertBefore(preElem, this._consoleElem);

    this._container.addEventListener('click', this.onClick.bind(this), false);
  };

  CodeBlock.prototype.onClick = function onClick(e) {
    var _this2 = this;

    this._isOpen = !this._isOpen;
    this._btnElem.innerHTML = this._isOpen ? this._btnText.close : this._btnText.open;
    this._consoleElem.style.display = this._isOpen ? 'block' : 'none';

    if (this._isOpen) {
      this._consoleElem.innerHTML = '';

      window.onerror = function (errorMsg, file, lineNumber, colNumber, error) {
        _this2.showError(errorMsg);
      };

      if (this._language == 'js') {
        this.executeJS();
      } else if (this._language == 'jses6') {
        this.executeJSES6();
      }
    } else {
      window.onerror = null;

      if (this._script) {
        this._script.parentNode.removeChild(this._script);
      }

      if (this._consoleError) {
        console.error = this._consoleError;
      }
    }
  };

  CodeBlock.prototype.executeJS = function executeJS() {
    this._code = '(function(){' + this._code + '})();';
    this._script = document.createElement('script');

    this._script.type = 'text/javascript';
    this._script.innerHTML = this._code;
    document.body.appendChild(this._script);
  };

  CodeBlock.prototype.executeJSES6 = function executeJSES6() {
    var _this3 = this;

    this._consoleError = console.error;
    console.error = function (e) {
      _this3.showError(e);
    };

    babel.run(this._code);
  };

  CodeBlock.prototype.execute = function execute(content) {
    if (typeof content != 'string') {
      try {
        content = JSON.stringify(content);
      } catch (e) {}
    }
    this._consoleElem.innerHTML += '<div><span>&gt;</span>' + content + '</div>';
  };

  CodeBlock.prototype.showError = function showError(message) {
    console.log(message);
    this._consoleElem.innerHTML += '<div style="color:red;"><span>&gt;</span>' + message + '</div>';
  };

  return CodeBlock;
})();

},{}]},{},[1]);
