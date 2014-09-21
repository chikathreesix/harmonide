import { URLHandler } from './url_handler';

export class Presentation{
  constructor(container, options){
    this._container = container;
    this._currentIndex = 0;
    this._pages = [];
    this._urlHandler = URLHandler.getInstance();

    this._pages = this._getPages();
    this._setEvents();
  }

  _getPages(){
    var pageElems = this._container.getElementsByTagName('section'),
        pages = [];

    for(let i = 0, len = pageElems.length; i < len; i++){
      pages.push(new Page(pageElems[i]));
    }
    return pages;
  }

  _setEvents(){
    this._urlHandler.on('change', this._onChangeURL.bind(this));
    window.addEventListener('keydown', this._onKeyDown.bind(this), false);
  }

  _onKeyDown(event){
    let code = event.keyCode;
    console.log(code);

		switch(code){
			//Enter
			case 13:
			//Right
			case 39:
				this.nextPage();
				break;
			//Left
			case 37:
				this.prevPage();
				break;
		}
  }

  _onChangeURL(event){
    console.log(event);
  }

  moveTo(page = 0){
    var currentPage = this._pages[this._currentIndex],
        nextPage = this._pages[page];

    if(this._currentIndex > page){
      currentPage.next(nextPage);
    }else{
      currentPage.prev(nextPage);
    }
  }

  nextPage(){
    if(this._currentIndex >= this._pages.length - 1) return;
    this.moveTo(this._currentIndex + 1);
  }

  prevPage(){
    if(this._currentIndex < 0) return;
    this.moveTo(this._currentIndex - 1);
  }
}
