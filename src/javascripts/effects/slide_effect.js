export class SlideEffect{
  constructor(container){
    this._container = container;
    this._container.style.transition = 'transform 0.5s';
  }

  next(currPage, nextPage){
  }

  prev(currPage, prevPage){
  }

  get className(){
    return 'effect_slide';
  }
}
