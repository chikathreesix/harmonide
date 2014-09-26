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
		var pageNum = (match) ? parseInt(match[1], 10) - 1 : 0;
  }

  get currentIndex(){
    return 0;
  }
}
