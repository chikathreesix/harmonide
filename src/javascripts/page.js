import { SlideEffect } from './effects/slide_effect';
import { Dom } from './util';

export class Page{
  constructor(container, options){
    this._container = container;
    this._state = 0;

    if(options && options.effect){
      this._effect = options.effect;
    }else{
      this._effect = new SlideEffect(this._container);
    }

    this._container.className += this._effect.className;
  }

  set state(state){
    Dom(this._container).removeClass(this._getStateClass(this._state));
    this._state = state;
    Dom(this._container).addClass(this._getStateClass(this._state));
  }

  _getStateClass(state){
    switch(state){
      case -1:
        return 'prev';
      case 0:
        return 'curr';
      case 1:
        return 'next';
    }
  }

  next(page){
    this._effect.next(this, page);
    this.state = -1;
    page.state = 0;
  }

  prev(page){
    this._effect.prev(this, page);
    this.state = 1;
    page.state = 0;
  }

  get effect(){
    return this._effect;
  }
}
