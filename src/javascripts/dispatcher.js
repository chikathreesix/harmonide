export class Dispatcher{
  constructor(){
    this._eventCbs = {};
  }

  on(type, callback){
    if(!this._eventCbs[type]) this._eventCbs[type] = [];
    this._eventCbs[type].push(callback);
  }

  off(type, callback){
    delete this._eventCbs[type];
  }

  trigger(type){
    var callbacks = this._eventCbs[type];
    if(!callbacks) return;

    for(let callback of callbacks){
      callback({
        type: type,
        target: this
      });
    }
  }
}
