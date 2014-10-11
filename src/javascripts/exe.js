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

    if(this._language == 'js'){
      this.replaceJSCode();
    }

    this.createElements();
  }

  replaceJSCode(){
    this._code = this._code.replace(/console\.log\((.*)\)/, "exe.log(" + this._index + ", $1)").replace(/&lt;/,"<");
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

    this._btnElem.addEventListener('click', this.onClick.bind(this), false);
  }

  onClick(e){
    this._isOpen = !this._isOpen;
    this._btnElem.innerHTML = (this._isOpen) ? this._btnText.close : this._btnText.open;

    if(this._isOpen){
      this._consoleElem.style.display = 'block';
      this._consoleElem.innerHTML = '';

		  var script = document.createElement('script');
		  
		  script.type = 'text/javascript';
		  script.innerHTML = this._code;
		  document.body.appendChild(script);
		  document.body.removeChild(script);
    }else{
      this._consoleElem.style.display = 'none';
    }
  }

  execute(content){
    this._consoleElem.innerHTML += "<span>&gt;</span>" + content;
  }
}
