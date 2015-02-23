import { SlideEffect } from './effects/slide_effect';
import { Dom } from './util';
import { PageSequence } from './page_sequence';

const WIDTH = 680;
const HEIGHT = 480;

export class Page{
  constructor(container, state, options){

    this._container = container;
    this._content = container.querySelector('.slide');
    this.state = state;

    this.setDefaultSize();

    if(options && options.effect){
      this._effect = options.effect;
    }else{
      this._effect = new SlideEffect(this._container);
    }

    Dom(this._container).addClass(this._effect.className);

    this._setPageSequence();
  }

  _setPageSequence() {
    var sequenceElem = this._container.querySelector('.sequence');
    if (!sequenceElem) {
      return;
    }

    this._pageSequence = new PageSequence(sequenceElem);
  }

  setDefaultSize(){
    this._content.style.width = WIDTH + 'px';

    if(this._content.offsetHeight < HEIGHT){
      this._content.style.height = HEIGHT + 'px';
    }
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
    let widthRatio = width / WIDTH;
    let heightRatio = height / this._content.offsetHeight;
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

  proceed(isNext) {
    if (!this._pageSequence) {
      return false;
    }

    return this._pageSequence.proceed(isNext);
  }

  get effect(){
    return this._effect;
  }
}
