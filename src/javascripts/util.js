export var Dom = function(elem){
  return new DomHandler(elem);
}

class DomHandler{
  constructor(elem){
    this._elem = elem;
  }

  addClass(name){
    var className = this._elem.className;
    if(className && className.length !== 0){
      let classNames = className.split(' ');
      if(classNames.indexOf(name) === -1){
        classNames.push(name);
      }
      this._elem.className = classNames.join(' ');
    }else{
      this._elem.className = name;
    }
  }

  removeClass(name){
    var className = this._elem.className;
    if(className){
      let classNames = className.split(' '),
          index = classNames.indexOf(name);
      if(index !== -1){
        classNames.splice(index);
      }
      this._elem.className = classNames.join(' ');
    }
  }

  get element(){
    return this._elem;
  }
}
