import { SlideEffect } from './effects/slide_effect';
import { Dom } from './util';

export class Page{
  constructor(container, state, options){
    this._container = container;
    this._content = container.querySelector('.slide_content');
    this.state = state;

    this._originWidth = this._content.offsetWidth;
    this._originHeight = this._content.offsetHeight;

    if(options && options.effect){
      this._effect = options.effect;
    }else{
      this._effect = new SlideEffect(this._container);
    }

    Dom(this._container).addClass(this._effect.className);
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

  resize(width, height){
    let widthRatio = width / this._originWidth;
    let heightRatio = height / this._originHeight;
    let ratio = (widthRatio < heightRatio) ? widthRatio : heightRatio;

    this._content.style.zoom = ratio;
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
