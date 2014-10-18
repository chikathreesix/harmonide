window.exe = {
  executor: null,

  init(initCb){
    this.executor = new CodeExecutor(initCb);
  },

  log(index, content){
    this.executor.execute(index, content);
  }
}

class CodeExecutor{
  constructor(initCb){
    this._codeBlocks = [];

    var readyPromise = new Promise((resolve, reject) => {
      if(document.readyState == "complete" || document.readyState == "loaded"){
        resolve();
        return;
      }

      window.addEventListener('DOMContentLoaded', () => {
        resolve();
      }, false);
    });

    readyPromise.then(() => {
      var codeElems = document.querySelectorAll('pre code.exe');
      Array.prototype.forEach.call(codeElems, (elem, index) => {
        this._codeBlocks.push(new CodeBlock(elem, index));
      });
      initCb();
    });
  }

  execute(index, content){
    var codeBlock = this._codeBlocks[index];
    codeBlock.execute(content);
  }
}

class CodeBlock{
  constructor(elem, index){
    this._index = index;
    this._elem = elem;
    this._code = elem.innerHTML;
    this._language = elem.dataset.language;
    this._isOpen = false;
    this._btnText = {open: 'Run', close: 'close'};

    if(this._language == 'js' || this._language == 'jses6'){
      this.replaceJSCode();
    }
    this.createElements();
  }

  replaceJSCode(){
    this._code = this._code.replace(/console\.log\((.*)\)/g, "exe.log(" + this._index + ", $1)").replace(/&lt;/g,"<").replace(/&gt;/g,">");
  }

  createElements(){
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
  }

  onClick(e){
    this._isOpen = !this._isOpen;
    this._btnElem.innerHTML = (this._isOpen) ? this._btnText.close : this._btnText.open;
    this._consoleElem.style.display = (this._isOpen) ? 'block' : 'none';

    if(this._isOpen){
      this._consoleElem.innerHTML = '';

      window.onerror = (errorMsg, file, lineNumber, colNumber, error)  => {
        this.showError(errorMsg);
      }

      if(this._language == 'js'){
        this.executeJS();
      }else if(this._language == 'jses6'){
        this.executeJSES6();
      }
    }else{
      window.onerror = null;

      if(this._script){
        this._script.parentNode.removeChild(this._script);
      }

      if(this._consoleError){
        console.error = this._consoleError;
      }
    }
  }

  executeJS(){
    this._code = '(function(){' + this._code + '})();';
    this._script = document.createElement('script');

    this._script.type = 'text/javascript';
    this._script.innerHTML = this._code;
    document.body.appendChild(this._script);
  }

  executeJSES6(){
    this._consoleError = console.error;
    console.error = (e) => {
      this.showError(e);
    }
    traceur.options.experimental = true;

    this._script = document.createElement('script');
    this._script.type = 'module';
    this._script.innerHTML = this._code;
    document.body.appendChild(this._script);
    new traceur.WebPageTranscoder(document.location.href).run();
  }

  execute(content){
    if(typeof content != 'string'){
      try{
        content = JSON.stringify(content);
      }catch(e){
      }
    }
    this._consoleElem.innerHTML += '<div><span>&gt;</span>' + content + '</div>';
  }

  showError(message){
    console.log(message);
    this._consoleElem.innerHTML += '<div style="color:red;"><span>&gt;</span>' + message + '</div>';
  }
}
