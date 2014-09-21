System.register("../src/javascripts/dispatcher", [], function() {
  "use strict";
  var __moduleName = "../src/javascripts/dispatcher";
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
      var callback$__3;
      var callbacks = this._eventCbs[$traceurRuntime.toProperty(type)];
      if (!callbacks)
        return;
      for (var $__1 = callbacks[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__2; !($__2 = $__1.next()).done; ) {
        callback$__3 = $__2.value;
        {
          callback$__3({
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
System.register("../src/javascripts/url_handler", [], function() {
  "use strict";
  var __moduleName = "../src/javascripts/url_handler";
  var Dispatcher = System.get("../src/javascripts/dispatcher").Dispatcher;
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
    var pageNum = (match) ? parseInt(match[1], 10) - 1 : 0;
  };
  var $URLHandlerInner = URLHandlerInner;
  ($traceurRuntime.createClass)(URLHandlerInner, {}, {}, Dispatcher);
  return {get URLHandler() {
      return URLHandler;
    }};
});
System.register("../src/javascripts/presentation", [], function() {
  "use strict";
  var __moduleName = "../src/javascripts/presentation";
  var URLHandler = System.get("../src/javascripts/url_handler").URLHandler;
  var Presentation = function Presentation(container, options) {
    this._container = container;
    this._currentIndex = 0;
    this._pages = [];
    this._urlHandler = URLHandler.getInstance();
    this._pages = this._getPages();
    this._setEvents();
  };
  ($traceurRuntime.createClass)(Presentation, {
    _getPages: function() {
      var pageElems = this._container.getElementsByTagName('section'),
          pages = [];
      for (var i$__8 = 0,
          len$__9 = pageElems.length; i$__8 < len$__9; i$__8++) {
        pages.push(new Page(pageElems[$traceurRuntime.toProperty(i$__8)]));
      }
      return pages;
    },
    _setEvents: function() {
      this._urlHandler.on('change', this._onChangeURL.bind(this));
      window.addEventListener('keydown', this._onKeyDown.bind(this), false);
    },
    _onKeyDown: function(event) {
      var code = event.keyCode;
      console.log(code);
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
      var currentPage = this._pages[$traceurRuntime.toProperty(this._currentIndex)],
          nextPage = this._pages[$traceurRuntime.toProperty(page)];
      if (this._currentIndex > page) {
        currentPage.next(nextPage);
      } else {
        currentPage.prev(nextPage);
      }
    },
    nextPage: function() {
      if (this._currentIndex >= this._pages.length - 1)
        return;
      this.moveTo(this._currentIndex + 1);
    },
    prevPage: function() {
      if (this._currentIndex < 0)
        return;
      this.moveTo(this._currentIndex - 1);
    }
  }, {});
  return {get Presentation() {
      return Presentation;
    }};
});
System.register("../src/javascripts/main", [], function() {
  "use strict";
  var __moduleName = "../src/javascripts/main";
  var Presentation = System.get("../src/javascripts/presentation").Presentation;
  window.addEventListener('DOMContentLoaded', (function(event) {
    var container = document.getElementById('presentation'),
        presentation1 = new Presentation(container);
  }));
  return {};
});
System.get("../src/javascripts/main" + '');
