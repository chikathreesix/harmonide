import { Dispatcher } from './dispatcher';

export var URLHandler = {
  _instance: null,
  getInstance(){
    this._instance = this._instance || new URLHandlerInner();
    return this._instance;
  }
}

class URLHandlerInner extends Dispatcher{
  constructor(){
    super();
    var match = location.href.match(/#([0-9]+)$/);
		this._pageNum = (match) ? parseInt(match[1], 10) - 1 : 0;
  }

  get pageIndex(){
    return this._pageNum;
  }

  set pageIndex(index){
    this._pageNum = index;
    let url = location.href.replace(/#[0-9]+$/, '');
		location.href = url + '#' + String(index + 1);
  }
}
