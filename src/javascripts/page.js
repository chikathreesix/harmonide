import { SlideEffect } from './effects/slide_effect';

export class Page{
  constructor(container, options){
    this._container = container;
    if(options.effect){
      this._effect = options.effect;
    }else{
      this._effect = new SlideEffect();
    }

    this._container.className += this._effect.className;
  }

  next(page){
    this._effect.next(this, page);
  }

  prev(page){
    this._effect.prev(this, page);
  }

  get effect(){
    return this._effect;
  }
}
