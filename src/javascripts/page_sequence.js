export class PageSequence {
  constructor(container) {
    this._container = container;
    this._currentIndex = 0;
    this._childElems = container.children;

    this.show(this._currentIndex);
  }

  show(sequenceIndex) {
    for (var i = 0, len = this._childElems.length; i < len; i++) {
      var elem = this._childElems[i];
      if (sequenceIndex == i) {
        elem.style.visibility = 'visible';
      } else {
        elem.style.visibility = 'hidden';
      }
    }
    this._currentIndex = sequenceIndex;
  }

  proceed(isNext) {
    var nextIndex = (isNext) ? this._currentIndex + 1 : this._currentIndex - 1;

    if (nextIndex >= this._childElems.length || nextIndex <= 0) {
      return false;
    }

    this.show(nextIndex);
    return true;
  }

  get length() {
    return this._childElems.length;
  }
}
