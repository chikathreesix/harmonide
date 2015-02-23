System.register("../../src/javascripts/effects/slide_effect", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/effects/slide_effect";
  var SlideEffect = function SlideEffect(container) {
    this._container = container;
    this._container.style.transition = 'transform 0.5s';
  };
  ($traceurRuntime.createClass)(SlideEffect, {
    next: function(currPage, nextPage) {},
    prev: function(currPage, prevPage) {},
    get className() {
      return 'effect_slide';
    }
  }, {});
  return {get SlideEffect() {
      return SlideEffect;
    }};
});
System.register("../../src/javascripts/page_sequence", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/page_sequence";
  var PageSequence = function PageSequence(container) {
    this._container = container;
    this._currentIndex = 0;
    this._childElems = container.children;
    this.reset();
    this.show(this._currentIndex);
  };
  ($traceurRuntime.createClass)(PageSequence, {
    reset: function() {
      for (var i = 0,
          len = this._childElems.length; i < len; i++) {
        var elem = this._childElems[$traceurRuntime.toProperty(i)];
        elem.style.visibility = 'hidden';
      }
    },
    show: function(sequenceIndex) {
      for (var i = 0,
          len = this._childElems.length; i < len; i++) {
        var elem = this._childElems[$traceurRuntime.toProperty(i)];
        if (sequenceIndex >= i) {
          elem.style.visibility = 'visible';
        } else {
          elem.style.visibility = 'hidden';
        }
      }
      this._currentIndex = sequenceIndex;
    },
    proceed: function(isNext) {
      var nextIndex = (isNext) ? this._currentIndex + 1 : this._currentIndex - 1;
      if (nextIndex >= this._childElems.length || nextIndex < 0) {
        return false;
      }
      this.show(nextIndex);
      return true;
    },
    get length() {
      return this._childElems.length;
    }
  }, {});
  return {get PageSequence() {
      return PageSequence;
    }};
});
System.register("../../src/javascripts/util", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/util";
  var Dom = function(elem) {
    return new DomHandler(elem);
  };
  var DomHandler = function DomHandler(elem) {
    this._elem = elem;
  };
  ($traceurRuntime.createClass)(DomHandler, {
    addClass: function(name) {
      var classNames$__3;
      var className = this._elem.className;
      if (className && className.length !== 0) {
        classNames$__3 = className.split(' ');
        if (classNames$__3.indexOf(name) === -1) {
          classNames$__3.push(name);
        }
        this._elem.className = classNames$__3.join(' ');
      } else {
        this._elem.className = name;
      }
    },
    removeClass: function(name) {
      var classNames$__4,
          index$__5;
      var className = this._elem.className;
      if (className) {
        classNames$__4 = className.split(' ');
        index$__5 = classNames$__4.indexOf(name);
        if (index$__5 !== -1) {
          classNames$__4.splice(index$__5, 1);
        }
        this._elem.className = classNames$__4.join(' ');
      }
    },
    get element() {
      return this._elem;
    }
  }, {});
  return {get Dom() {
      return Dom;
    }};
});
System.register("../../src/javascripts/page", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/page";
  var SlideEffect = System.get("../../src/javascripts/effects/slide_effect").SlideEffect;
  var Dom = System.get("../../src/javascripts/util").Dom;
  var PageSequence = System.get("../../src/javascripts/page_sequence").PageSequence;
  var WIDTH = 680;
  var HEIGHT = 480;
  var Page = function Page(container, state, options) {
    this._container = container;
    this._content = container.querySelector('.slide');
    this.state = state;
    this.setDefaultSize();
    if (options && options.effect) {
      this._effect = options.effect;
    } else {
      this._effect = new SlideEffect(this._container);
    }
    Dom(this._container).addClass(this._effect.className);
    this._setPageSequence();
  };
  ($traceurRuntime.createClass)(Page, {
    _setPageSequence: function() {
      var sequenceElem = this._container.querySelector('.sequence');
      if (!sequenceElem) {
        return;
      }
      this._pageSequence = new PageSequence(sequenceElem);
    },
    setDefaultSize: function() {
      this._content.style.width = WIDTH + 'px';
      if (this._content.offsetHeight < HEIGHT) {
        this._content.style.height = HEIGHT + 'px';
      }
    },
    set state(state) {
      Dom(this._container).removeClass(this._getStateClass(this._state));
      this._state = state;
      Dom(this._container).addClass(this._getStateClass(this._state));
    },
    _getStateClass: function(state) {
      switch (state) {
        case -1:
          return 'prev';
        case 0:
          return 'curr';
        case 1:
          return 'next';
      }
    },
    resize: function(width, height) {
      var widthRatio = width / WIDTH;
      var heightRatio = height / this._content.offsetHeight;
      var ratio = (widthRatio < heightRatio) ? widthRatio : heightRatio;
      this._content.style.zoom = ratio;
    },
    next: function(page) {
      this._effect.next(this, page);
      this.state = -1;
      page.state = 0;
    },
    prev: function(page) {
      this._effect.prev(this, page);
      this.state = 1;
      page.state = 0;
    },
    proceed: function(isNext) {
      if (!this._pageSequence) {
        return false;
      }
      return this._pageSequence.proceed(isNext);
    },
    get effect() {
      return this._effect;
    }
  }, {});
  return {get Page() {
      return Page;
    }};
});
System.register("../../src/javascripts/dispatcher", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/dispatcher";
  var Dispatcher = function Dispatcher() {
    this._eventCbs = {};
  };
  ($traceurRuntime.createClass)(Dispatcher, {
    on: function(type, callback) {
      if (!this._eventCbs[$traceurRuntime.toProperty(type)])
        $traceurRuntime.setProperty(this._eventCbs, type, []);
      this._eventCbs[$traceurRuntime.toProperty(type)].push(callback);
    },
    off: function(type, callback) {
      delete this._eventCbs[$traceurRuntime.toProperty(type)];
    },
    trigger: function(type) {
      var callback$__13;
      var callbacks = this._eventCbs[$traceurRuntime.toProperty(type)];
      if (!callbacks)
        return;
      for (var $__11 = callbacks[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__12; !($__12 = $__11.next()).done; ) {
        callback$__13 = $__12.value;
        {
          callback$__13({
            type: type,
            target: this
          });
        }
      }
    }
  }, {});
  return {get Dispatcher() {
      return Dispatcher;
    }};
});
System.register("../../src/javascripts/url_handler", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/url_handler";
  var Dispatcher = System.get("../../src/javascripts/dispatcher").Dispatcher;
  var URLHandler = {
    _instance: null,
    getInstance: function() {
      this._instance = this._instance || new URLHandlerInner();
      return this._instance;
    }
  };
  var URLHandlerInner = function URLHandlerInner() {
    $traceurRuntime.superCall(this, $URLHandlerInner.prototype, "constructor", []);
    var match = location.href.match(/#([0-9]+)$/);
    this._pageNum = (match) ? parseInt(match[1], 10) - 1 : 0;
  };
  var $URLHandlerInner = URLHandlerInner;
  ($traceurRuntime.createClass)(URLHandlerInner, {
    get pageIndex() {
      return this._pageNum;
    },
    set pageIndex(index) {
      this._pageNum = index;
      var url = location.href.replace(/#[0-9]+$/, '');
      location.href = url + '#' + String(index + 1);
    }
  }, {}, Dispatcher);
  return {get URLHandler() {
      return URLHandler;
    }};
});
System.register("../../src/javascripts/presentation", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/presentation";
  var URLHandler = System.get("../../src/javascripts/url_handler").URLHandler;
  var Page = System.get("../../src/javascripts/page").Page;
  var Presentation = function Presentation(container, options) {
    this._container = container;
    this._pages = [];
    this._urlHandler = URLHandler.getInstance();
    this._setPages(this._urlHandler.pageIndex);
    this._setEvents();
    this._onResize();
    this._container.style.visibility = 'visible';
  };
  ($traceurRuntime.createClass)(Presentation, {
    _setPages: function(index) {
      var state$__21;
      var page$__22;
      var pageElems = this._container.getElementsByTagName('section');
      for (var i$__19 = 0,
          len$__20 = pageElems.length; i$__19 < len$__20; i$__19++) {
        state$__21 = (i$__19 === index) ? 0 : (i$__19 < index) ? -1 : 1;
        page$__22 = new Page(pageElems[$traceurRuntime.toProperty(i$__19)], state$__21);
        this._pages.push(page$__22);
      }
    },
    _setEvents: function() {
      this._urlHandler.on('change', this._onChangeURL.bind(this));
      window.addEventListener('keydown', this._onKeyDown.bind(this), false);
      window.addEventListener('resize', this._onResize.bind(this), false);
      document.querySelector('.controls .arrow.right').addEventListener('click', this.nextPage.bind(this), false);
      document.querySelector('.controls .arrow.left').addEventListener('click', this.prevPage.bind(this), false);
    },
    _onResize: function(event) {
      this._pages.forEach((function(page) {
        page.resize(window.innerWidth, window.innerHeight);
      }));
    },
    _onKeyDown: function(event) {
      var code = event.keyCode;
      switch (code) {
        case 13:
        case 39:
          this.nextPage();
          break;
        case 37:
          this.prevPage();
          break;
      }
    },
    _onChangeURL: function(event) {
      console.log(event);
    },
    moveTo: function() {
      var page = arguments[0] !== (void 0) ? arguments[0] : 0;
      var currentIndex = this._urlHandler.pageIndex;
      var currentPage = this._pages[$traceurRuntime.toProperty(currentIndex)];
      var nextPage = this._pages[$traceurRuntime.toProperty(page)];
      if (currentIndex < page) {
        currentPage.next(nextPage);
      } else {
        currentPage.prev(nextPage);
      }
      this._urlHandler.pageIndex = page;
    },
    nextPage: function() {
      var currentIndex = this._urlHandler.pageIndex;
      var currentPage = this._pages[$traceurRuntime.toProperty(currentIndex)];
      if (!currentPage.proceed(true)) {
        if (currentIndex >= this._pages.length - 1)
          return;
        this.moveTo(currentIndex + 1);
      }
    },
    prevPage: function() {
      var currentIndex = this._urlHandler.pageIndex;
      var currentPage = this._pages[$traceurRuntime.toProperty(currentIndex)];
      if (!currentPage.proceed(false)) {
        if (currentIndex <= 0)
          return;
        this.moveTo(currentIndex - 1);
      }
    }
  }, {});
  return {get Presentation() {
      return Presentation;
    }};
});
System.register("../../src/javascripts/harmonide", [], function() {
  "use strict";
  var __moduleName = "../../src/javascripts/harmonide";
  var Presentation = System.get("../../src/javascripts/presentation").Presentation;
  window.addEventListener('DOMContentLoaded', (function(event) {
    var container = document.getElementById('presentation'),
        presentation1 = new Presentation(container);
  }));
  return {};
});
System.get("../../src/javascripts/harmonide" + '');
