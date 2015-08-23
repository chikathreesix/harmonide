(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._eventCbs = {};
  }

  Dispatcher.prototype.on = function on(type, callback) {
    if (!this._eventCbs[type]) this._eventCbs[type] = [];
    this._eventCbs[type].push(callback);
  };

  Dispatcher.prototype.off = function off(type, callback) {
    delete this._eventCbs[type];
  };

  Dispatcher.prototype.trigger = function trigger(type) {
    var callbacks = this._eventCbs[type];
    if (!callbacks) return;

    for (var _iterator = callbacks, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var callback = _ref;

      callback({
        type: type,
        target: this
      });
    }
  };

  return Dispatcher;
})();

exports.Dispatcher = Dispatcher;

},{}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SlideEffect = (function () {
  function SlideEffect(container) {
    _classCallCheck(this, SlideEffect);

    this._container = container;
    this._container.style.transition = 'transform 0.5s';
  }

  SlideEffect.prototype.next = function next(currPage, nextPage) {};

  SlideEffect.prototype.prev = function prev(currPage, prevPage) {};

  _createClass(SlideEffect, [{
    key: 'className',
    get: function get() {
      return 'effect_slide';
    }
  }]);

  return SlideEffect;
})();

exports.SlideEffect = SlideEffect;

},{}],3:[function(require,module,exports){
'use strict';

var _presentation = require('./presentation');

window.addEventListener('DOMContentLoaded', function (event) {
  var container = document.getElementById('presentation'),
      presentation1 = new _presentation.Presentation(container);
});

},{"./presentation":6}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _effectsSlide_effect = require('./effects/slide_effect');

var _util = require('./util');

var _page_sequence = require('./page_sequence');

var WIDTH = 680;
var HEIGHT = 480;

var Page = (function () {
  function Page(container, state, options) {
    _classCallCheck(this, Page);

    this._container = container;
    this._content = container.querySelector('.slide');
    this.state = state;

    this.setDefaultSize();

    if (options && options.effect) {
      this._effect = options.effect;
    } else {
      this._effect = new _effectsSlide_effect.SlideEffect(this._container);
    }

    _util.Dom(this._container).addClass(this._effect.className);

    this._setPageSequence();
  }

  Page.prototype._setPageSequence = function _setPageSequence() {
    var sequenceElem = this._container.querySelector('.sequence');
    if (!sequenceElem) {
      return;
    }

    this._pageSequence = new _page_sequence.PageSequence(sequenceElem);
  };

  Page.prototype.setDefaultSize = function setDefaultSize() {
    this._content.style.width = WIDTH + 'px';

    if (this._content.offsetHeight < HEIGHT) {
      this._content.style.height = HEIGHT + 'px';
    }
  };

  Page.prototype._getStateClass = function _getStateClass(state) {
    switch (state) {
      case -1:
        return 'prev';
      case 0:
        return 'curr';
      case 1:
        return 'next';
    }
  };

  Page.prototype.resize = function resize(width, height) {
    var widthRatio = width / WIDTH;
    var heightRatio = height / this._content.offsetHeight;
    var ratio = widthRatio < heightRatio ? widthRatio : heightRatio;

    this._content.style.zoom = ratio;
  };

  Page.prototype.next = function next(page) {
    this._effect.next(this, page);
    this.state = -1;
    page.state = 0;
  };

  Page.prototype.prev = function prev(page) {
    this._effect.prev(this, page);
    this.state = 1;
    page.state = 0;
  };

  Page.prototype.proceed = function proceed(isNext) {
    if (!this._pageSequence) {
      return false;
    }

    return this._pageSequence.proceed(isNext);
  };

  _createClass(Page, [{
    key: 'state',
    set: function set(state) {
      _util.Dom(this._container).removeClass(this._getStateClass(this._state));
      this._state = state;
      _util.Dom(this._container).addClass(this._getStateClass(this._state));
    }
  }, {
    key: 'effect',
    get: function get() {
      return this._effect;
    }
  }]);

  return Page;
})();

exports.Page = Page;

},{"./effects/slide_effect":2,"./page_sequence":5,"./util":8}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PageSequence = (function () {
  function PageSequence(container) {
    _classCallCheck(this, PageSequence);

    this._container = container;
    this._currentIndex = 0;
    this._childElems = container.children;

    this.reset();
    this.show(this._currentIndex);
  }

  PageSequence.prototype.reset = function reset() {
    for (var i = 0, len = this._childElems.length; i < len; i++) {
      var elem = this._childElems[i];
      elem.style.visibility = 'hidden';
    }
  };

  PageSequence.prototype.show = function show(sequenceIndex) {
    for (var i = 0, len = this._childElems.length; i < len; i++) {
      var elem = this._childElems[i];
      if (sequenceIndex >= i) {
        elem.style.visibility = 'visible';
      } else {
        elem.style.visibility = 'hidden';
      }
    }
    this._currentIndex = sequenceIndex;
  };

  PageSequence.prototype.proceed = function proceed(isNext) {
    var nextIndex = isNext ? this._currentIndex + 1 : this._currentIndex - 1;

    if (nextIndex >= this._childElems.length || nextIndex < 0) {
      return false;
    }

    this.show(nextIndex);
    return true;
  };

  _createClass(PageSequence, [{
    key: 'length',
    get: function get() {
      return this._childElems.length;
    }
  }]);

  return PageSequence;
})();

exports.PageSequence = PageSequence;

},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _url_handler = require('./url_handler');

var _page = require('./page');

var Presentation = (function () {
  function Presentation(container, options) {
    _classCallCheck(this, Presentation);

    this._container = container;
    this._pages = [];
    this._urlHandler = _url_handler.URLHandler.getInstance();

    this._setPages(this._urlHandler.pageIndex);
    this._setEvents();
    this._onResize();

    this._container.style.visibility = 'visible';
  }

  Presentation.prototype._setPages = function _setPages(index) {
    var pageElems = this._container.getElementsByTagName('section');

    for (var i = 0, len = pageElems.length; i < len; i++) {
      var state = i === index ? 0 : i < index ? -1 : 1;
      var page = new _page.Page(pageElems[i], state);
      this._pages.push(page);
    }
  };

  Presentation.prototype._setEvents = function _setEvents() {
    this._urlHandler.on('change', this._onChangeURL.bind(this));
    window.addEventListener('keydown', this._onKeyDown.bind(this), false);
    window.addEventListener('resize', this._onResize.bind(this), false);
    document.querySelector('.controls .arrow.right').addEventListener('click', this.nextPage.bind(this), false);
    document.querySelector('.controls .arrow.left').addEventListener('click', this.prevPage.bind(this), false);
  };

  Presentation.prototype._onResize = function _onResize(event) {
    this._pages.forEach(function (page) {
      page.resize(window.innerWidth, window.innerHeight);
    });
  };

  Presentation.prototype._onKeyDown = function _onKeyDown(event) {
    var code = event.keyCode;

    switch (code) {
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
  };

  Presentation.prototype._onChangeURL = function _onChangeURL(event) {
    console.log(event);
  };

  Presentation.prototype.moveTo = function moveTo() {
    var page = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    var currentIndex = this._urlHandler.pageIndex;
    var currentPage = this._pages[currentIndex];
    var nextPage = this._pages[page];

    if (currentIndex < page) {
      currentPage.next(nextPage);
    } else {
      currentPage.prev(nextPage);
    }

    this._urlHandler.pageIndex = page;
  };

  Presentation.prototype.nextPage = function nextPage() {
    var currentIndex = this._urlHandler.pageIndex;
    var currentPage = this._pages[currentIndex];

    if (!currentPage.proceed(true)) {
      if (currentIndex >= this._pages.length - 1) return;
      this.moveTo(currentIndex + 1);
    }
  };

  Presentation.prototype.prevPage = function prevPage() {
    var currentIndex = this._urlHandler.pageIndex;
    var currentPage = this._pages[currentIndex];

    if (!currentPage.proceed(false)) {
      if (currentIndex <= 0) return;
      this.moveTo(currentIndex - 1);
    }
  };

  return Presentation;
})();

exports.Presentation = Presentation;

},{"./page":4,"./url_handler":7}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _dispatcher = require('./dispatcher');

var URLHandler = {
  _instance: null,
  getInstance: function getInstance() {
    this._instance = this._instance || new URLHandlerInner();
    return this._instance;
  }
};

exports.URLHandler = URLHandler;

var URLHandlerInner = (function (_Dispatcher) {
  _inherits(URLHandlerInner, _Dispatcher);

  function URLHandlerInner() {
    _classCallCheck(this, URLHandlerInner);

    _Dispatcher.call(this);
    var match = location.href.match(/#([0-9]+)$/);
    this._pageNum = match ? parseInt(match[1], 10) - 1 : 0;
  }

  _createClass(URLHandlerInner, [{
    key: 'pageIndex',
    get: function get() {
      return this._pageNum;
    },
    set: function set(index) {
      this._pageNum = index;
      var url = location.href.replace(/#[0-9]+$/, '');
      location.href = url + '#' + String(index + 1);
    }
  }]);

  return URLHandlerInner;
})(_dispatcher.Dispatcher);

},{"./dispatcher":1}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Dom = function Dom(elem) {
  return new DomHandler(elem);
};

exports.Dom = Dom;

var DomHandler = (function () {
  function DomHandler(elem) {
    _classCallCheck(this, DomHandler);

    this._elem = elem;
  }

  DomHandler.prototype.addClass = function addClass(name) {
    var className = this._elem.className;
    if (className && className.length !== 0) {
      var classNames = className.split(' ');
      if (classNames.indexOf(name) === -1) {
        classNames.push(name);
      }
      this._elem.className = classNames.join(' ');
    } else {
      this._elem.className = name;
    }
  };

  DomHandler.prototype.removeClass = function removeClass(name) {
    var className = this._elem.className;
    if (className) {
      var classNames = className.split(' '),
          index = classNames.indexOf(name);
      if (index !== -1) {
        classNames.splice(index, 1);
      }
      this._elem.className = classNames.join(' ');
    }
  };

  _createClass(DomHandler, [{
    key: 'element',
    get: function get() {
      return this._elem;
    }
  }]);

  return DomHandler;
})();

},{}]},{},[3]);
