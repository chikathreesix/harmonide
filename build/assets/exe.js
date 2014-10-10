System.register("../../src/javascripts/exe", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/exe";
  window.exe = {
    executor: null,
    init: function(initCb) {
      this.executor = new CodeExecutor(initCb);
    },
    log: function(index, content) {
      console.log(index, content);
      this.executor.execute(index, content);
    }
  };
  var CodeExecutor = function CodeExecutor(initCb) {
    var $__0 = this;
    this._codeBlocks = [];
    var readyPromise = new Promise((function(resolve, reject) {
      if (document.readyState == "complete" || document.readyState == "loaded") {
        resolve();
        return;
      }
      window.addEventListener('DOMContentLoaded', (function() {
        resolve();
      }), false);
    }));
    readyPromise.then((function() {
      var codeElems = document.querySelectorAll('pre code.exe');
      Array.prototype.forEach.call(codeElems, (function(elem, index) {
        $__0._codeBlocks.push(new CodeBlock(elem, index));
      }));
      initCb();
    }));
  };
  ($traceurRuntime.createClass)(CodeExecutor, {execute: function(index, content) {
      var codeBlock = this._codeBlocks[$traceurRuntime.toProperty(index)];
      codeBlock.execute(content);
    }}, {});
  var CodeBlock = function CodeBlock(elem, index) {
    this._index = index;
    this._elem = elem;
    this._code = elem.innerHTML;
    this._language = elem.dataset.language;
    if (this._language == 'js') {
      this.replaceJSCode();
    }
    this.createElements();
  };
  ($traceurRuntime.createClass)(CodeBlock, {
    replaceJSCode: function() {
      this._code = this._code.replace(/console\.log\((.*)\)/, "exe.log(" + this._index + ", $1)").replace(/&lt;/, "<");
    },
    createElements: function() {
      var preElem = this._elem.parentNode;
      this._container = document.createElement('div');
      this._consoleElem = document.createElement('div');
      this._btnElem = document.createElement('div');
      this._container.className = 'exe-container';
      this._consoleElem.className = 'exe-console';
      this._btnElem.className = 'exe-btn';
      this._btnElem.innerHTML = 'Run the code';
      preElem.parentNode.insertBefore(this._container, preElem);
      this._container.appendChild(this._consoleElem);
      this._container.appendChild(this._btnElem);
      this._container.insertBefore(preElem, this._consoleElem);
      this._btnElem.addEventListener('click', this.onClick.bind(this), false);
    },
    onClick: function(e) {
      this._consoleElem.style.display = 'block';
      this._consoleElem.innerHTML = '';
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = this._code;
      document.body.appendChild(script);
      document.body.removeChild(script);
    },
    execute: function(content) {
      this._consoleElem.innerHTML += "<span>&gt;</span>" + content;
    }
  }, {});
  return {};
});
System.get("../../src/javascripts/exe" + '');
