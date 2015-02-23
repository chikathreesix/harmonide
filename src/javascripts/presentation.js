import { URLHandler } from './url_handler';
import { Page } from './page';

export class Presentation{
  constructor(container, options){
    this._container = container;
    this._pages = [];
    this._urlHandler = URLHandler.getInstance();

    this._setPages(this._urlHandler.pageIndex);
    this._setEvents();
    this._onResize();

    this._container.style.visibility = 'visible';
  }

  _setPages(index){
    var pageElems = this._container.getElementsByTagName('section');

    for(let i = 0, len = pageElems.length; i < len; i++){
      let state = (i === index) ? 0 : (i < index) ? -1 : 1;
      let page = new Page(pageElems[i], state);
      this._pages.push(page);
    }
  }

  _setEvents(){
    this._urlHandler.on('change', this._onChangeURL.bind(this));
    window.addEventListener('keydown', this._onKeyDown.bind(this), false);
    window.addEventListener('resize', this._onResize.bind(this), false);
    document.querySelector('.controls .arrow.right').addEventListener('click', this.nextPage.bind(this), false);
    document.querySelector('.controls .arrow.left').addEventListener('click', this.prevPage.bind(this), false);
  }

  _onResize(event){
    this._pages.forEach(page => {
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
    let currentIndex = this._urlHandler.pageIndex;
    let currentPage = this._pages[currentIndex];
    let nextPage = this._pages[page];

    if(currentIndex < page){
      currentPage.next(nextPage);
    }else{
      currentPage.prev(nextPage);
    }

    this._urlHandler.pageIndex = page;
  }

  nextPage(){
    var currentIndex = this._urlHandler.pageIndex;
    var currentPage = this._pages[currentIndex];

    if (!currentPage.proceed(true)) {
      if(currentIndex >= this._pages.length - 1) return;
      this.moveTo(currentIndex + 1);
    }
  }

  prevPage(){
    var currentIndex = this._urlHandler.pageIndex;
    var currentPage = this._pages[currentIndex];
    
    if (!currentPage.proceed(false)) {
      if(currentIndex <= 0) return;
      this.moveTo(currentIndex - 1);
    }
  }
}
