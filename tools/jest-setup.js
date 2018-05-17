import jsdom from 'jsdom';
const { JSDOM } = jsdom;

global.document = new JSDOM('<!doctype HTML><html><body><div id="root"></div></body></html>');
global.window = document.parentWindow;

global.document.scrollingElement = {
  clientWidth: 1024,
  clientHeight: 768,
  scrollTop: 0,
  scrollLeft: 0,
};

global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = height || global.window.innerHeight;
  global.document.scrollingElement = Object.assign({}, global.document.scrollingElement, {
    clientWidth: global.window.innerWidth,
    clientHeight: global.window.innerHeight,
  });
  global.window.dispatchEvent(new Event('resize'));
};

global.window.scrollTo = (top, left) => {
  global.document.scrollingElement = Object.assign({}, global.document.scrollingElement, {
    scrollTop: top || global.document.scrollingElement.scrollTop,
    scrollLeft: left || global.document.scrollingElement.scrollLeft,
  });
  global.window.dispatchEvent(new Event('scroll'));
};

global.window.Element.prototype.getBoundingClientRect = () => {
  return {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
};

/**
 * Think of this as the global 'document' object
 * The contents of body is just a string for the purposes of this unit test
 */
const documentMock = {
  set body(str) {
    this._body = str
    this.triggerEvent(str)
  },
  get body(){
    return this._body
  },
  triggerEvent: function (arr) {
    for (let key in this.subscribers) {
      this.subscribers[key](["event1"])
    }
  },
  subscribe: function (sub) {
    this.subscribers = sub
  },
  unsubscribe: function (sub) {
    delete this.subscribers[sub]
  },
  subscribers: {}
};

class MutationObserver {
  constructor(cb) {
    this._cb = cb
    this.enabled
  }

  observe(target, config) {
    documentMock.subscribe.call(documentMock, {
      MutationObserver: function (arr) {
        this._cb(arr)
      }.bind(this)
    })
  }

  disconnect() {
    documentMock.unsubscribe.call(documentMock, 'MutationObserver')
  }
}

global.window.MutationObserver = MutationObserver;
