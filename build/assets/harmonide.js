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
      var classNames$__2;
      var className = this._elem.className;
      if (className && className.length !== 0) {
        classNames$__2 = className.split(' ');
        if (classNames$__2.indexOf(name) === -1) {
          classNames$__2.push(name);
        }
        this._elem.className = classNames$__2.join(' ');
      } else {
        this._elem.className = name;
      }
    },
    removeClass: function(name) {
      var classNames$__3,
          index$__4;
      var className = this._elem.className;
      if (className) {
        classNames$__3 = className.split(' ');
        index$__4 = classNames$__3.indexOf(name);
        if (index$__4 !== -1) {
          classNames$__3.splice(index$__4, 1);
        }
        this._elem.className = classNames$__3.join(' ');
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
  var Page = function Page(container, state, options) {
    this._container = container;
    this._content = container.querySelector('.slide');
    this.state = state;
    this._originWidth = this._content.offsetWidth;
    this._originHeight = this._content.offsetHeight;
    if (options && options.effect) {
      this._effect = options.effect;
    } else {
      this._effect = new SlideEffect(this._container);
    }
    Dom(this._container).addClass(this._effect.className);
  };
  ($traceurRuntime.createClass)(Page, {
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
      var widthRatio = width / this._originWidth;
      var heightRatio = height / this._originHeight;
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
      var callback$__11;
      var callbacks = this._eventCbs[$traceurRuntime.toProperty(type)];
      if (!callbacks)
        return;
      for (var $__9 = callbacks[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__10; !($__10 = $__9.next()).done; ) {
        callback$__11 = $__10.value;
        {
          callback$__11({
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
      var state$__19;
      var page$__20;
      var pageElems = this._container.getElementsByTagName('section');
      for (var i$__17 = 0,
          len$__18 = pageElems.length; i$__17 < len$__18; i$__17++) {
        state$__19 = (i$__17 === index) ? 0 : (i$__17 < index) ? -1 : 1;
        page$__20 = new Page(pageElems[$traceurRuntime.toProperty(i$__17)], state$__19);
        this._pages.push(page$__20);
      }
    },
    _setEvents: function() {
      this._urlHandler.on('change', this._onChangeURL.bind(this));
      window.addEventListener('keydown', this._onKeyDown.bind(this), false);
      window.addEventListener('resize', this._onResize.bind(this), false);
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
      if (currentIndex >= this._pages.length - 1)
        return;
      this.moveTo(currentIndex + 1);
    },
    prevPage: function() {
      var currentIndex = this._urlHandler.pageIndex;
      if (currentIndex <= 0)
        return;
      this.moveTo(currentIndex - 1);
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
