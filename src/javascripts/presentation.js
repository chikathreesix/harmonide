import { URLHandler } from './url_handler';
import { Page } from './page';

export class Presentation{
  constructor(container, options){
    this._container = container;
    this._currentIndex = 0;
    this._pages = [];
    this._urlHandler = URLHandler.getInstance();

    this._setPages(this._urlHandler.currentIndex);
    this._setEvents();
    this._onResize();
  }

  _setPages(index){
    var pageElems = this._container.getElementsByTagName('section');

    for(let i = 0, len = pageElems.length; i < len; i++){
      let page = new Page(pageElems[i]);
      page.state = (i === index) ? 0 : (i < index) ? -1 : 1;
      this._pages.push(page);
    }
  }

  _setEvents(){
    this._urlHandler.on('change', this._onChangeURL.bind(this));
    window.addEventListener('keydown', this._onKeyDown.bind(this), false);
    window.addEventListener('resize', this._onResize.bind(this), false);
  }

  _onResize(event){
    this._pages.forEach((page) => {
      page.resize(window.innerWidth, window.innerHeight);
    });
  }

  _onKeyDown(event){
    let code = event.keyCode;

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

    if(this._currentIndex < page){
      currentPage.next(nextPage);
    }else{
      currentPage.prev(nextPage);
    }

    this._currentIndex = page;
  }

  nextPage(){
    if(this._currentIndex >= this._pages.length - 1) return;
    this.moveTo(this._currentIndex + 1);
  }

  prevPage(){
    if(this._currentIndex <= 0) return;
    this.moveTo(this._currentIndex - 1);
  }
}
