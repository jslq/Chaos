// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../chaos/common/clone.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clone = clone;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function clone(val, depth) {
  if (depth === void 0) {
    depth = 5;
  }

  if (_typeof(val) !== 'object') {
    return val;
  }

  if (val === null) {
    return null;
  }

  var clonedObject = Array.isArray(val) ? [] : {};

  for (var key in val) {
    clonedObject[key] = depth <= 1 ? val[key] : clone(val[key], depth - 1);
  }

  return clonedObject;
}
},{}],"../chaos/common/constant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasEvent = exports.ImageComponentNeedArguments = exports.ComponentNeedArguments = exports.ComponentType = exports.FRAMEWORK = void 0;
var FRAMEWORK = 'Chaos';
exports.FRAMEWORK = FRAMEWORK;
var ComponentType;
exports.ComponentType = ComponentType;

(function (ComponentType) {
  ComponentType["Image"] = "Image";
})(ComponentType || (exports.ComponentType = ComponentType = {}));

var ComponentNeedArguments = ['x', 'y', 'width', 'height'];
exports.ComponentNeedArguments = ComponentNeedArguments;
var ImageComponentNeedArguments = ['scope', 'x', 'y', 'width', 'height'];
exports.ImageComponentNeedArguments = ImageComponentNeedArguments;
var CanvasEvent = ['click'];
exports.CanvasEvent = CanvasEvent;
},{}],"../chaos/common/logger.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = createLogger;
exports.default = exports.logger = void 0;

var _constant = require("./constant");

var logger;
exports.logger = logger;

var Logger =
/** @class */
function () {
  function Logger(switchDebug) {
    this.debug = switchDebug;
    this.prefix = _constant.FRAMEWORK + ":";
    this._prefix = "%c" + _constant.FRAMEWORK + ":";
  }

  Logger.prototype.info = function (type, description) {
    if (description === void 0) {
      description = '';
    }

    if (this.debug) window.console.info(this._prefix + ("%c" + type), 'color: blue; font-weight: 600', 'color: #333333', description);
  };

  Logger.prototype.error = function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (this.debug) (_a = window.console).error.apply(_a, [this.prefix].concat(args));
  };

  Logger.prototype.warn = function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    if (this.debug) (_a = window.console).warn.apply(_a, [this.prefix].concat(args));
  };

  return Logger;
}();

function createLogger(switchDebug) {
  exports.logger = logger = new Logger(switchDebug);
}

var _default = Logger;
exports.default = _default;
},{"./constant":"../chaos/common/constant.ts"}],"../chaos/common/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDom = getDom;
exports.isUndefined = isUndefined;
exports.onEvent = onEvent;
exports.extend = extend;

var _logger = require("./logger");

function getDom(el) {
  if (typeof el === 'string') {
    var dom = document.querySelector(el);

    if (!dom) {
      _logger.logger.warn("\u65E0\u6CD5\u627E\u5230\u6307\u5B9A\u5143\u7D20" + el + ", \u8BF7\u68C0\u67E5\u53C2\u6570");
    }

    return dom;
  }

  return el;
}

function isUndefined(x) {
  return typeof x === 'undefined';
}

function onEvent(eventType) {
  return "on" + (eventType.slice(0, 1).toUpperCase() + eventType.slice(1));
}

function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
},{"./logger":"../chaos/common/logger.ts"}],"../chaos/deps/imgLoader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;
exports.convertArrToObj = convertArrToObj;
exports.getObjectKeyValueToArray = getObjectKeyValueToArray;
exports.createImgPromise = createImgPromise;
exports.loadImgResourse = void 0;

function createloadImgResourseFn(flatten, getObjectKeyValueToArray, createImgPromise) {
  return function (obj) {
    var arr = getObjectKeyValueToArray(obj);
    arr = flatten(arr);
    return Promise.all(arr.map(function (e) {
      return createImgPromise(e);
    }));
  };
}

var loadImgResourse = createloadImgResourseFn(flatten, getObjectKeyValueToArray, createImgPromise);
exports.loadImgResourse = loadImgResourse;

function flatten(arr) {
  return arr.reduce(function (a, b) {
    return Array.isArray(b) ? a.concat(b) : a.concat([b]);
  }, []);
}

function convertArrToObj(arr) {
  return arr.reduce(function (a, b) {
    if (a[b.name]) {
      if (Array.isArray(a[b.name])) {
        a[b.name].push(b.img);
      } else {
        var arr_1 = [];
        arr_1.push(a[b.name]);
        arr_1.push(b.img);
        a[b.name] = arr_1;
      }
    } else {
      a[b.name] = b.img;
    }

    return a;
  }, {});
}

function getObjectKeyValueToArray(obj) {
  return Object.entries(obj).reduce(function (a, b) {
    a.push(Array.isArray(b[1]) ? b[1].map(function (c) {
      return {
        name: b[0],
        url: c
      };
    }) : {
      name: b[0],
      url: b[1]
    });
    return a;
  }, []);
}

function createImgPromise(imgobj) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = imgobj.url;

    img.onload = function () {
      return resolve({
        name: imgobj.name,
        img: img
      });
    };

    img.onerror = function () {
      return reject(imgobj.url + " error network\uFF0C\u8BF7\u68C0\u67E5");
    };

    setTimeout(function () {
      return reject(imgobj.url + " error network");
    }, 8000);
  });
}
},{}],"../chaos/core/loader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _imgLoader = require("../deps/imgLoader");

var Loader =
/** @class */
function () {
  function Loader() {
    this._res = {};
  }

  Loader.prototype.loadImages = function (imgs) {
    var _this = this;

    this._res.images = {};
    return (0, _imgLoader.loadImgResourse)(imgs).then(function (imgsSourceBack) {
      _this._res.images = (0, _imgLoader.convertArrToObj)(imgsSourceBack);
    });
  };

  return Loader;
}();

var _default = Loader;
exports.default = _default;
},{"../deps/imgLoader":"../chaos/deps/imgLoader.ts"}],"../chaos/core/formedComponent.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = require("../common/logger");

var _utils = require("../common/utils");

var _constant = require("../common/constant");

function normalState(attribute) {
  var args = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    args[_i - 1] = arguments[_i];
  }

  if (typeof attribute === 'number') {
    return attribute;
  }

  if (typeof attribute === 'function') {
    try {
      var res = Math.floor(Number(attribute.apply(void 0, args)));
      return res;
    } catch (e) {
      _logger.logger.error("\u7EC4\u4EF6\u53C2\u6570 " + attribute.name + " \u89E3\u6790\u9519\u8BEF", e);
    }
  }
}

function createImageCanvas(image, w, h) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;
  ctx.save();
  ctx.drawImage(image, 0, 0, w, h);
  ctx.restore();
  return canvas;
}

function imageState(getImage, width, height) {
  var images = getImage();
  var image = Array.isArray(images) ? images.map(function (image) {
    return createImageCanvas(image, width, height);
  }) : createImageCanvas(images, width, height);
  return image;
}

var FormedComponent =
/** @class */
function () {
  function FormedComponent(component, w, h, canvas) {
    var _this = this;

    var ratio = component.ratio,
        x = component.x,
        y = component.y,
        width = component.width,
        height = component.height,
        $data = component.$data,
        getImage = component.getImage,
        _a = component.operate,
        operate = _a === void 0 ? function () {} : _a;
    Object.keys(component).forEach(function (_) {
      _this[_] = component[_];
    });
    this._ratio = ratio;
    this.$canvas = canvas;
    this._canvasWidth = w * ratio;
    this._canvasHeight = h * ratio;
    this.x = normalState(x, w, h, $data);
    this.y = normalState(y, w, h, $data);
    var $width = this.width = normalState(width, w, h, $data);
    var $height = this.height = normalState(height, w, h, $data);
    var $images = this.images = imageState(getImage, $width * ratio, $height * ratio);
    this.$data = $data;
    this.operate = operate.bind(this, w, h);

    this.beforeDraw = function () {
      var _this = this;

      var errorHappened = false;

      _constant.ComponentNeedArguments.forEach(function (_) {
        if ((0, _utils.isUndefined)(_this[_])) {
          errorHappened = true;

          _logger.logger.error("\u8BF7\u6B63\u786E\u8BA1\u7B97 " + _this.componentName + " \u7684 " + _ + " \u503C");
        }
      });

      var componentType = this.componentType;

      if (componentType === _constant.ComponentType.Image) {
        try {
          var index = typeof this.index === 'function' && this.index.call(this, $data) || 0;
          this.currentImage = Array.isArray(this.images) ? this.images[index] : this.images;
        } catch (e) {
          errorHappened = true;

          _logger.logger.error(this.componentName + "\u56FE\u7247\u53D6\u503C\u9519\u8BEF", e);
        }
      }

      return errorHappened;
    };
  }

  Object.defineProperty(FormedComponent.prototype, "x", {
    get: function get() {
      return this._x / this._ratio;
    },
    set: function set(val) {
      this._x = val * this._ratio;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FormedComponent.prototype, "y", {
    get: function get() {
      return this._y / this._ratio;
    },
    set: function set(val) {
      this._y = val * this._ratio;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FormedComponent.prototype, "width", {
    get: function get() {
      return this._width / this._ratio;
    },
    set: function set(val) {
      this._width = val * this._ratio;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FormedComponent.prototype, "height", {
    get: function get() {
      return this._height / this._ratio;
    },
    set: function set(val) {
      this._height = val * this._ratio;
    },
    enumerable: true,
    configurable: true
  });
  return FormedComponent;
}();

var _default = FormedComponent;
exports.default = _default;
},{"../common/logger":"../chaos/common/logger.ts","../common/utils":"../chaos/common/utils.ts","../common/constant":"../chaos/common/constant.ts"}],"../chaos/core/emitter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constant = require("../common/constant");

var _utils = require("../common/utils");

function checkVisible(component) {
  var _a = component.operate,
      operate = _a === void 0 ? function () {} : _a;

  if (operate() === false) {
    return false;
  }

  return true;
}

function checkWrappedIn(component, eventX, eventY) {
  var x = component.x,
      y = component.y,
      width = component.width,
      height = component.height;

  if (eventX >= x && eventX <= x + width && eventY >= y && eventY <= y + height) {
    return true;
  }

  return false;
}

var Emitter =
/** @class */
function () {
  function Emitter() {
    this.eventStack = {};

    _constant.CanvasEvent.reduce(function (stack, eventType) {
      return stack[eventType] = [];
    }, this.eventStack);
  }

  Emitter.prototype.dispatch = function (eventType, x, y) {
    var dispatchedComponents = this.eventStack[eventType];
    dispatchedComponents.forEach(function (component) {
      if (!checkVisible(component)) return;

      if (checkWrappedIn(component, x, y)) {
        component[(0, _utils.onEvent)(eventType)]();
      }
    });
  };

  Emitter.prototype.subscribe = function (eventType, component) {
    eventType = eventType.slice(2).toLowerCase();
    this.eventStack[eventType].push(component);
  };

  return Emitter;
}();

var _default = Emitter;
exports.default = _default;
},{"../common/constant":"../chaos/common/constant.ts","../common/utils":"../chaos/common/utils.ts"}],"../chaos/core/chaos-core.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculate = calculate;
exports.registerCanvasEventListener = registerCanvasEventListener;
exports.default = void 0;

var _logger = require("../common/logger");

var _constant = require("../common/constant");

var _formedComponent = _interopRequireDefault(require("./formedComponent"));

var _utils = require("../common/utils");

var _emitter = _interopRequireDefault(require("./emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculate(component, w, h, canvas) {
  return new _formedComponent.default(component, w, h, canvas);
}

function registerCanvasEventListener(canvas, emitter) {
  function callback(event) {
    var offsetX = event.offsetX,
        offsetY = event.offsetY;
    emitter.dispatch(this, offsetX, offsetY);
  }

  _constant.CanvasEvent.forEach(function (evnetType) {
    canvas.addEventListener(evnetType, callback.bind(evnetType));
  });
}

var ChaosCore =
/** @class */
function () {
  function ChaosCore() {
    this.beforeCalculateStack = [];
    this.afterCalculateStack = [];
    this.copyAfterCalculateStack = [];
    this.emitter = new _emitter.default();
  }

  ChaosCore.prototype.storeCanvas = function (canvas, ratio) {
    this.canvas = canvas;
    this.ratio = ratio;
    var width = canvas.width,
        height = canvas.height;
    this.ctx = canvas.getContext('2d');
    registerCanvasEventListener(canvas, this.emitter);
    this.afterCalculateStack = this.beforeCalculateStack.map(function (component) {
      return calculate(component, width / ratio, height / ratio, canvas);
    });
    this.loadEvent(this.afterCalculateStack);
    this.loadDraw(this.afterCalculateStack);
    this.loadAllComponents(this.afterCalculateStack);
    this.copyAfterCalculateStack = this.afterCalculateStack.map(function (component) {
      return Object.assign({}, component);
    });
    this.draw();
  };

  ChaosCore.prototype.loadAllComponents = function (components) {
    components.forEach(function (component) {
      component.$components = {};
      components.reduce(function (loadObject, component) {
        loadObject[component.componentName] = component;
        return loadObject;
      }, component.$components);
    });
  };

  ChaosCore.prototype.loadEvent = function (components) {
    var _this = this;

    var events = _constant.CanvasEvent.map(function (event) {
      return (0, _utils.onEvent)(event);
    });

    components.forEach(function (component) {
      for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
        var event = events_1[_i];

        if (component[event] && typeof component[event] === 'function') {
          component[event] = component[event].bind(component);

          _this.emitter.subscribe(event, component);
        }
      }
    });
  };

  ChaosCore.prototype.loadDraw = function (components) {
    var self = this;
    var _a = this.canvas,
        width = _a.width,
        height = _a.height;
    var ratio = this.ratio;

    function defaultDraw() {
      var _a = this,
          operate = _a.operate,
          currentImage = _a.currentImage,
          _x = _a._x,
          _y = _a._y;

      try {
        var cancelable = operate();
        if (cancelable === false) return;
        self.ctx.drawImage(currentImage, this._x, this._y);
      } catch (e) {
        _logger.logger.error(e);
      }
    }

    components.forEach(function (component) {
      var draw = component.draw,
          currentImage = component.currentImage,
          operate = component.operate,
          $data = component.$data;
      component.draw = draw ? function () {
        try {
          var cancelable = operate();
          if (cancelable === false) return;
          draw.call(component, self.ctx, width / ratio, height / ratio, ratio);
        } catch (e) {
          _logger.logger.error(e);
        }
      } : defaultDraw.bind(component);
    });
  };

  ChaosCore.prototype.push = function (choas, componentName, options) {
    this.beforeCalculateStack.push(Object.assign({}, options, {
      componentName: componentName
    }));
  };

  ChaosCore.prototype.reset = function () {
    var _this = this;

    this.afterCalculateStack.forEach(function (component) {
      var mirror = _this.copyAfterCalculateStack.filter(function (_) {
        return component.componentName === _.componentName;
      })[0];

      (0, _utils.extend)(component, mirror);
    });
  };

  Object.defineProperty(ChaosCore.prototype, "_draw", {
    get: function get() {
      var _this = this;

      return function () {
        var _a = _this.canvas,
            width = _a.width,
            height = _a.height;

        _this.ctx.clearRect(0, 0, width, height);

        _this.afterCalculateStack.forEach(function (component) {
          if (component.beforeDraw()) return;
          component.draw();
        });

        window.requestAnimationFrame(_this._draw);
      };
    },
    enumerable: true,
    configurable: true
  });

  ChaosCore.prototype.draw = function () {
    this._draw();
  };

  return ChaosCore;
}();

var _default = ChaosCore;
exports.default = _default;
},{"../common/logger":"../chaos/common/logger.ts","../common/constant":"../chaos/common/constant.ts","./formedComponent":"../chaos/core/formedComponent.ts","../common/utils":"../chaos/common/utils.ts","./emitter":"../chaos/core/emitter.ts"}],"../chaos/core/state.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../common/utils");

var State =
/** @class */
function () {
  function State(globalData) {
    State.cache = Object.assign({}, globalData);
    (0, _utils.extend)(this, globalData);
  }

  State.prototype.reset = function () {
    (0, _utils.extend)(this, State.cache);
  };

  return State;
}();

var _default = State;
exports.default = _default;
},{"../common/utils":"../chaos/common/utils.ts"}],"../chaos/chaos.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _clone = require("./common/clone");

var _utils = require("./common/utils");

var _loader = _interopRequireDefault(require("./core/loader"));

var _chaosCore = _interopRequireDefault(require("./core/chaos-core"));

var _logger = require("./common/logger");

var _state = _interopRequireDefault(require("./core/state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Chaos =
/** @class */
function () {
  function Chaos(options) {
    if (options === void 0) {
      options = {};
    }

    this._mounted = false;
    this._core = new _chaosCore.default();
    this._loader = new _loader.default();
    this.options = (0, _clone.clone)(options);
    var _a = this.options,
        _b = _a.globalData,
        globalData = _b === void 0 ? {} : _b,
        _c = _a.debug,
        debug = _c === void 0 ? true : _c,
        _d = _a.ratio,
        ratio = _d === void 0 ? 1 : _d;
    this.$state = new _state.default(globalData);
    (0, _logger.createLogger)(debug);
    this.coreOptions = {
      $data: this.$state,
      ratio: ratio
    };
  }

  Chaos.prototype.loadImages = function (imgs) {
    var _this = this;

    var _a = this.options.error,
        error = _a === void 0 ? function () {} : _a;

    this._loader.loadImages(imgs).then(function (_) {
      return _this._mount();
    }).catch(function (e) {
      _logger.logger.error(e);
    });

    return this;
  };

  Chaos.prototype.generateCanvas = function (w, h) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  };

  Chaos.prototype.beforeMount = function () {
    var _a = this.options,
        canvasWidth = _a.canvasWidth,
        canvasHeight = _a.canvasHeight,
        ratio = _a.ratio;

    if (canvasWidth && canvasHeight) {
      return this.generateCanvas(canvasWidth, canvasHeight);
    }

    var mountedElement = this.mountedElement;
    var clientWidth = mountedElement.clientWidth,
        clientHeight = mountedElement.clientHeight;
    return this.generateCanvas(clientWidth * ratio, clientHeight * ratio);
  };

  Chaos.prototype._mount = function () {
    var _a = this.options,
        _b = _a.success,
        success = _b === void 0 ? function () {} : _b,
        ratio = _a.ratio;

    if (!this._mounted) {
      _logger.logger.error("\u8BF7\u8C03\u7528mount\u65B9\u6CD5");
    }

    var canvas = this.canvas = this.beforeMount();

    this._core.storeCanvas(canvas, ratio);

    this.mountedElement.append(canvas);
    success();
  };

  Chaos.prototype.use = function (componentName, component) {
    this._core.push(this, componentName, component(this.coreOptions, this._loader));
  };

  Chaos.prototype.reset = function () {
    this.$state.reset();

    this._core.reset();
  };

  Chaos.prototype.mount = function (el) {
    if (_typeof(el) === undefined && _typeof(this.options.mountedElement) === undefined) {
      this.mountedElement = document.body;
    }

    this.mountedElement = (0, _utils.getDom)(el || this.options.mountedElement);
    this._mounted = true;
    return this;
  };

  return Chaos;
}();

var _default = Chaos;
exports.default = _default;
},{"./common/clone":"../chaos/common/clone.ts","./common/utils":"../chaos/common/utils.ts","./core/loader":"../chaos/core/loader.ts","./core/chaos-core":"../chaos/core/chaos-core.ts","./common/logger":"../chaos/common/logger.ts","./core/state":"../chaos/core/state.ts"}],"../chaos/core/components.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageComponent = ImageComponent;

var _logger = require("../common/logger");

var _constant = require("../common/constant");

var _utils = require("../common/utils");

function ImageComponent(options) {
  _constant.ImageComponentNeedArguments.forEach(function (_) {
    if ((0, _utils.isUndefined)(options[_])) {
      _logger.logger.warn("\u56FE\u7247\u7EC4\u4EF6\u9700\u8981\u53C2\u6570 " + _);
    }
  });

  return function (coreOptions, loader) {
    return Object.assign({}, coreOptions, options, {
      componentType: _constant.ComponentType.Image,
      getImage: function getImage() {
        var image = loader._res.images[options.scope];

        if (!image) {
          _logger.logger.warn("\u672A\u627E\u5230\u8BE5scope: " + options.scope + "\u7684\u56FE\u7247\u8D44\u6E90,\u8BF7\u68C0\u67E5scope");
        }

        return image;
      }
    });
  };
}
},{"../common/logger":"../chaos/common/logger.ts","../common/constant":"../chaos/common/constant.ts","../common/utils":"../chaos/common/utils.ts"}],"../chaos/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ImageComponent", {
  enumerable: true,
  get: function () {
    return _components.ImageComponent;
  }
});
exports.default = void 0;

var _chaos = _interopRequireDefault(require("./chaos"));

var _components = require("./core/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _chaos.default;
exports.default = _default;
},{"./chaos":"../chaos/chaos.ts","./core/components":"../chaos/core/components.ts"}],"../node_modules/_parcel-bundler@1.12.3@parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/_parcel-bundler@1.12.3@parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/_parcel-bundler@1.12.3@parcel-bundler/src/builtins/bundle-url.js"}],"lib/index.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/_parcel-bundler@1.12.3@parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _chaos = _interopRequireWildcard(require("../chaos"));

require("./lib/index.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var gameImage = {
  adsense1: 'http://img.souche.com/f2e/479ffcc0a5daa24b742a2c93c8ef17a7.png',
  adsense12: 'http://img.souche.com/f2e/6d31022b1438d21327c9e19ab81c7aa2.png',
  adsenseleft: 'http://img.souche.com/f2e/c518e3ccd924239b0a301dc0ac228262.png',
  adsense3: 'http://img.souche.com/f2e/fb578c952474d2cee79e15899bf2e88e.png',
  adsense4: 'http://img.souche.com/f2e/1fc6f5803a43768b277ab7d42c002085.png',
  adsenseright: 'http://img.souche.com/f2e/1deec85e13aae52e91409f402ff16aa6.png',
  arrow: 'http://img.souche.com/f2e/0714aa1d6a89c6bdfccf35f48ca9917c.png',
  arrowleft: 'http://img.souche.com/f2e/4d67576a334882a76e577bf33dc1889c.png',
  arrowright: 'http://img.souche.com/f2e/649ae9b482d9cc4b16c7abc05d5af371.png',
  bg: 'http://img.souche.com/f2e/a6acbdc4d22b207174bab877683cd2c1.jpg',
  buttonstart: 'http://img.souche.com/f2e/42d006fb1975f2959dd51dd687c64dd2.png',
  car1: 'http://img.souche.com/f2e/369601c442dd51a33e60cf01b8e1acac.png',
  cars: ['http://img.souche.com/f2e/3d21cc01cb9445a0c298b511523c7f02.png', 'http://img.souche.com/f2e/32584cbd0754851b071ea37b5fd4bca2.png'],
  counts: ['http://img.souche.com/f2e/27cbf2bd8aa339d97bc7e4deeaff4cd0.png', 'http://img.souche.com/f2e/04dfeacc925f13db09acb2c72b071ce1.png', 'http://img.souche.com/f2e/3e01ea662cd56aa218523348cc46cd11.png', 'http://img.souche.com/f2e/84b8bde5b5457e9b36ae84f5e4a3aaa2.png'],
  flag: 'http://img.souche.com/f2e/5da2d86e46e311df4cf7a3a8959eb60c.png',
  frame: 'http://img.souche.com/f2e/ed5066078a713ed6efbccd61e2745910.png',
  go: 'http://img.souche.com/f2e/dd6793efe567a5dfffbcbb7064d4befb.png',
  leftroad: 'http://img.souche.com/f2e/4d44a79e4277f9ebf586efae77ee9d86.png',
  rightroad: 'http://img.souche.com/f2e/ac5bc4c868e9f5b68f20fcb359134c1d.png',
  startline: 'http://img.souche.com/f2e/35a15405c07167b4b54deaedfab7f2a7.png',
  logo: ['http://img.souche.com/f2e/c08f12151ff6530c45f2e8a3e91f85aa.png', 'http://img.souche.com/f2e/c08f12151ff6530c45f2e8a3e91f85aa.png']
};
var radio = 375 / document.body.clientWidth;
var scale = radio * 2;

function fn() {
  this.y--;
}

function mutipleFn(fn, time) {
  while (time > 0) {
    time--;
    fn();
  }
}

function createRandomFn() {
  var pre = 0;

  var fn = function fn() {
    var x = Math.random();

    if (Math.abs(x - pre) < 0.2) {
      return fn();
    }

    pre = x;
    return x;
  };

  return fn;
}

var getRandom = createRandomFn();
var game = new _chaos.default({
  debug: true,
  ratio: 3,
  globalData: {
    start: false,
    count: 3,
    speed: 2,
    gamestart: false,
    preparedone: false,
    lane: 2,
    currentlane: 2,
    speedtimer: null,
    counttimer: null,
    move: 0
  },
  success: function success() {},
  error: function error(type, _error) {}
});
game.loadImages(gameImage).mount('#container');
game.use('adsense3', (0, _chaos.ImageComponent)({
  scope: 'adsense3',
  x: function x(w, h, $data) {
    return 1;
  },
  y: function y(w, h, $data) {
    return h - 628 / scale;
  },
  width: function width(w, h, $data) {
    return 67 / scale;
  },
  height: function height(w, h, $data) {
    return 628 / scale;
  }
}));
game.use('arrow1', (0, _chaos.ImageComponent)({
  scope: 'arrow',
  x: function x(w, h, $data) {
    return 13 / scale;
  },
  y: function y(w, h, $data) {
    return 28 / scale;
  },
  width: function width(w, h, $data) {
    return 43 / scale;
  },
  height: function height(w, h, $data) {
    return 214 / scale;
  }
}));
game.use('arrow2', (0, _chaos.ImageComponent)({
  scope: 'arrow',
  x: function x(w, h, $data) {
    return w - 56 / scale;
  },
  y: function y(w, h, $data) {
    return 28 / scale;
  },
  width: function width(w, h, $data) {
    return 43 / scale;
  },
  height: function height(w, h, $data) {
    return 214 / scale;
  }
}));
game.use('adsense1', (0, _chaos.ImageComponent)({
  scope: 'adsense1',
  x: function x(w, h, $data) {
    return 10 / scale;
  },
  y: function y(w, h, $data) {
    return h - 1080 / scale;
  },
  width: function width(w, h, $data) {
    return 67 / scale;
  },
  height: function height(w, h, $data) {
    return 169 / scale;
  },
  operate: function operate(w, h) {
    if (h < 640) {
      return false;
    }
  }
}));
game.use('adsense12', (0, _chaos.ImageComponent)({
  scope: 'adsense12',
  x: function x(w, h, $data) {
    return w - 77 / scale;
  },
  y: function y(w, h, $data) {
    return h - 1080 / scale;
  },
  width: function width(w, h, $data) {
    return 69 / scale;
  },
  height: function height(w, h, $data) {
    return 169 / scale;
  },
  operate: function operate(w, h) {
    if (h < 640) {
      return false;
    }
  }
}));
game.use('adsense4', (0, _chaos.ImageComponent)({
  scope: 'adsense4',
  x: function x(w, h, $data) {
    return w - 67 / scale - 1;
  },
  y: function y(w, h, $data) {
    return h - 628 / scale;
  },
  width: function width(w, h, $data) {
    return 67 / scale;
  },
  height: function height(w, h, $data) {
    return 628 / scale;
  }
}));
game.use('adsenseleft', (0, _chaos.ImageComponent)({
  scope: 'adsenseleft',
  x: function x(w, h, $data) {
    return 0;
  },
  y: function y(w, h, $data) {
    return h - 905 / scale;
  },
  width: function width(w, h, $data) {
    return 69 / scale;
  },
  height: function height(w, h, $data) {
    return 252 / scale;
  }
}));
game.use('adsenseright', (0, _chaos.ImageComponent)({
  scope: 'adsenseright',
  x: function x(w, h, $data) {
    return w - 69 / scale;
  },
  y: function y(w, h, $data) {
    return h - 905 / scale;
  },
  width: function width(w, h, $data) {
    return 69 / scale;
  },
  height: function height(w, h, $data) {
    return 252 / scale;
  }
}));
game.use('startline', (0, _chaos.ImageComponent)({
  scope: 'startline',
  x: function x(w, h, $data) {
    return 110 / scale;
  },
  y: function y(w, h, $data) {
    return h - 521 / scale;
  },
  width: function width(w, h, $data) {
    return 532 / scale;
  },
  height: function height(w, h, $data) {
    return 88 / scale;
  },
  operate: function operate() {
    var _this$$data = this.$data,
        gamestart = _this$$data.gamestart,
        speed = _this$$data.speed;

    if (gamestart) {
      this.y += speed;
    }
  }
}));
game.use('flag', (0, _chaos.ImageComponent)({
  scope: 'flag',
  x: function x(w, h, $data) {
    return w / 2 - 315 / scale / 2;
  },
  y: function y(w, h, $data) {
    return h - 137 / scale;
  },
  width: function width(w, h, $data) {
    return 315 / scale;
  },
  height: function height(w, h, $data) {
    return 137 / scale;
  },
  operate: function operate() {
    var gamestart = this.$data.gamestart;
    if (gamestart) return false;
  }
}));

function getCarY(b, c, h) {
  var a = -Math.floor(Math.random() * (1 * h) + 228 / scale);
  if (Math.abs(a - b) < 320 / scale) return getCarY(b, c, h);
  if (Math.abs(a - c) < 320 / scale) return getCarY(b, c, h);
  if (Math.abs(b - c) < 320 / scale) return getCarY(b, c, h);
  return a;
}

function carFn(w, h) {
  var _this$$data2 = this.$data,
      gamestart = _this$$data2.gamestart,
      speed = _this$$data2.speed,
      preparedone = _this$$data2.preparedone;

  if (gamestart === true) {
    if (preparedone === true) {
      this.y += speed;

      if (this.y >= h) {
        this.carindex = Math.floor(Math.random() * 2);

        if (this.componentName === 'car1') {
          this.y = getCarY(this.$components.car2.y, this.$components.car3.y, h);
        } else if (this.componentName === 'car2') {
          this.y = getCarY(this.$components.car1.y, this.$components.car3.y, h);
        } else {
          this.y = getCarY(this.$components.car1.y, this.$components.car2.y, h);
        }
      }

      var x = this.x,
          y = this.y,
          width = this.width,
          height = this.height;
      var _this$$components$myc = this.$components.mycar,
          mx = _this$$components$myc.x,
          my = _this$$components$myc.y,
          mwidth = _this$$components$myc.width,
          mheight = _this$$components$myc.height;
      x = x + 20 / scale;
      y = y + 20 / scale;
      width = width - 40 / scale;
      height = height - 60 / scale;
      mx = mx + 20 / scale;
      my = my + 20 / scale;
      mwidth = mwidth - 40 / scale;
      mheight = mheight - 60 / scale;

      if (mx >= x && mx <= x + width && my >= y && my <= y + height || mx + mwidth >= x && mx + mwidth <= x + width && my >= y && my <= y + height || mx >= x && mx <= x + width && my + mheight >= y && my + mheight <= y + height || mx + mwidth >= x && mx + mwidth <= x + width && my + mheight >= y && my + mheight <= y + height) {
        game.reset();
      }
    } else {
      this.y -= this.selfspeed;
    }
  }
}

game.use('car1', (0, _chaos.ImageComponent)({
  scope: 'cars',
  index: function index() {
    return this.carindex;
  },
  carindex: 0,
  x: function x(w, h, $data) {
    return 143 / scale;
  },
  y: function y(w, h, $data) {
    return h - 396 / scale;
  },
  width: function width(w, h, $data) {
    return 113 / scale;
  },
  height: function height(w, h, $data) {
    return 228 / scale;
  },
  selfspeed: Math.ceil(Math.random() * 3),
  operate: function operate(w, h) {
    carFn.call(this, w, h);
  }
}));
game.use('car2', (0, _chaos.ImageComponent)({
  scope: 'cars',
  index: function index() {
    return this.carindex;
  },
  carindex: 1,
  x: function x(w, h, $data) {
    return 505 / scale;
  },
  y: function y(w, h, $data) {
    return h - 396 / scale;
  },
  width: function width(w, h, $data) {
    return 113 / scale;
  },
  height: function height(w, h, $data) {
    return 228 / scale;
  },
  selfspeed: Math.ceil(Math.random() * 3),
  operate: function operate(w, h) {
    carFn.call(this, w, h);
  }
}));
game.use('car3', (0, _chaos.ImageComponent)({
  scope: 'cars',
  index: function index() {
    return this.carindex;
  },
  carindex: 0,
  x: function x(w, h, $data) {
    return 324 / scale;
  },
  y: function y(w, h, $data) {
    return -(228 / scale);
  },
  width: function width(w, h, $data) {
    return 113 / scale;
  },
  height: function height(w, h, $data) {
    return 228 / scale;
  },
  selfspeed: Math.ceil(Math.random() * 3),
  operate: function operate(w, h) {
    carFn.call(this, w, h);
  }
}));
game.use('mycar', (0, _chaos.ImageComponent)({
  scope: 'car1',
  x: function x(w, h, $data) {
    return 324 / scale;
  },
  y: function y(w, h, $data) {
    return h - 396 / scale;
  },
  width: function width(w, h, $data) {
    return 113 / scale;
  },
  height: function height(w, h, $data) {
    return 228 / scale;
  },
  operate: function operate(w, h) {
    var _this = this;

    var _this$$data3 = this.$data,
        gamestart = _this$$data3.gamestart,
        preparedone = _this$$data3.preparedone,
        speed = _this$$data3.speed,
        lane = _this$$data3.lane,
        currentlane = _this$$data3.currentlane;

    if (gamestart === true) {
      this.y -= speed;

      if (this.y <= h - 700 / scale) {
        this.y = h - 700 / scale;
        this.$data.preparedone = true;
        !this.$data.speedtimer && (this.$data.speedtimer = setInterval(function () {
          _this.$data.speed += 0.1;
        }, 500));
      }

      if (preparedone === true) {
        mutipleFn(function () {
          if (currentlane > lane && Math.abs(_this.$data.move) >= 1) {
            _this.x--;
            _this.$data.move++;
          } else if (currentlane < lane && Math.abs(_this.$data.move) >= 1) {
            _this.x++;
            _this.$data.move--;
          } else {
            _this.$data.currentlane = _this.$data.lane;
          }
        }, 3 + Math.floor(speed));
      }
    }
  }
}));
game.use('arrowleft', (0, _chaos.ImageComponent)({
  scope: 'arrowleft',
  x: function x(w, h, $data) {
    return 98 / scale;
  },
  y: function y(w, h, $data) {
    return h - 182 / scale;
  },
  width: function width(w, h, $data) {
    return 182 / scale;
  },
  height: function height(w, h, $data) {
    return 182 / scale;
  },
  operate: function operate() {},
  onClick: function onClick() {
    var _this$$data4 = this.$data,
        gamestart = _this$$data4.gamestart,
        lane = _this$$data4.lane,
        currentlane = _this$$data4.currentlane;

    if (gamestart) {
      if (lane !== currentlane) return;

      if (lane > 1) {
        this.$data.lane -= 1;
        this.$data.move = -(180 / scale);
      }
    }
  }
}));
game.use('arrowright', (0, _chaos.ImageComponent)({
  scope: 'arrowright',
  x: function x(w, h, $data) {
    return w - 279 / scale;
  },
  y: function y(w, h, $data) {
    return h - 182 / scale;
  },
  width: function width(w, h, $data) {
    return 182 / scale;
  },
  height: function height(w, h, $data) {
    return 182 / scale;
  },
  operate: function operate() {},
  onClick: function onClick() {
    var _this$$data5 = this.$data,
        gamestart = _this$$data5.gamestart,
        lane = _this$$data5.lane,
        currentlane = _this$$data5.currentlane;

    if (gamestart) {
      if (lane !== currentlane) return;

      if (lane < 3) {
        this.$data.lane += 1;
        this.$data.move = 180 / scale;
      }
    }
  }
}));
game.use('leftroad', (0, _chaos.ImageComponent)({
  scope: 'leftroad',
  x: function x(w, h, $data) {
    return 62 / scale;
  },
  y: function y(w, h, $data) {
    return 0;
  },
  width: function width(w, h, $data) {
    return 37 / scale;
  },
  height: function height(w, h, $data) {
    return 1334 / scale;
  },
  operate: function operate(w, h) {
    var _this2 = this;

    var _this$$data6 = this.$data,
        gamestart = _this$$data6.gamestart,
        speed = _this$$data6.speed;

    if (gamestart === true) {
      mutipleFn(function () {
        if (_this2.y >= h) {
          _this2.y = -h;
        }

        _this2.y++;
      }, Math.floor(speed) > 15 ? 15 : Math.floor(speed));
    }
  },
  draw: function draw(ctx, w, h, ratio, $data) {
    ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, 37 / scale * ratio, h * ratio);
  }
}));
game.use('leftroad1', (0, _chaos.ImageComponent)({
  scope: 'leftroad',
  x: function x(w, h, $data) {
    return 62 / scale;
  },
  y: function y(w, h, $data) {
    return -h;
  },
  width: function width(w, h, $data) {
    return 37 / scale;
  },
  height: function height(w, h, $data) {
    return 1334 / scale;
  },
  operate: function operate(w, h) {
    var _this3 = this;

    var _this$$data7 = this.$data,
        gamestart = _this$$data7.gamestart,
        speed = _this$$data7.speed;

    if (gamestart === true) {
      mutipleFn(function () {
        if (_this3.y >= h) {
          _this3.y = -h;
        }

        _this3.y++;
      }, Math.floor(speed) > 15 ? 15 : Math.floor(speed));
    }
  },
  draw: function draw(ctx, w, h, ratio) {
    ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, Math.floor(37 / scale * ratio), h * ratio);
  }
}));
game.use('rightroad', (0, _chaos.ImageComponent)({
  scope: 'rightroad',
  x: function x(w, h, $data) {
    return w - 100 / scale;
  },
  y: function y(w, h, $data) {
    return 0;
  },
  width: function width(w, h, $data) {
    return 37 / scale;
  },
  height: function height(w, h, $data) {
    return 1334 / scale;
  },
  operate: function operate(w, h) {
    var _this4 = this;

    var _this$$data8 = this.$data,
        gamestart = _this$$data8.gamestart,
        speed = _this$$data8.speed;

    if (gamestart === true) {
      mutipleFn(function () {
        if (_this4.y >= h) {
          _this4.y = -h;
        }

        _this4.y++;
      }, Math.floor(speed) > 15 ? 15 : Math.floor(speed));
    }
  },
  draw: function draw(ctx, w, h, ratio, $data) {
    ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, 37 / scale * ratio, h * ratio);
  }
}));
game.use('rightroad1', (0, _chaos.ImageComponent)({
  scope: 'rightroad',
  x: function x(w, h, $data) {
    return w - 100 / scale;
  },
  y: function y(w, h, $data) {
    return -h;
  },
  width: function width(w, h, $data) {
    return 37 / scale;
  },
  height: function height(w, h, $data) {
    return 1334 / scale;
  },
  operate: function operate(w, h) {
    var _this5 = this;

    var _this$$data9 = this.$data,
        gamestart = _this$$data9.gamestart,
        speed = _this$$data9.speed;

    if (gamestart === true) {
      mutipleFn(function () {
        if (_this5.y >= h) {
          _this5.y = -h;
        }

        _this5.y++;
      }, Math.floor(speed) > 15 ? 15 : Math.floor(speed));
    }
  },
  draw: function draw(ctx, w, h, ratio, $data) {
    ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, 37 / scale * ratio, h * ratio);
  }
}));
game.use('counts', (0, _chaos.ImageComponent)({
  scope: 'counts',
  index: function index($data) {
    return $data.count;
  },
  x: function x(w, h, $data) {
    return w / 2 - 234 / scale / 2;
  },
  y: function y(w, h, $data) {
    if (h > 600) {
      return h / 2 - 180;
    }

    return h - 900 / scale;
  },
  width: function width(w, h, $data) {
    return 234 / scale;
  },
  height: function height(w, h, $data) {
    return 194 / scale;
  },
  operate: function operate() {
    var _this6 = this;

    if (this.$data.start === true) {
      if (this.$data.gamestart) return false;

      if (!this.$data.counttimer) {
        this.$data.counttimer = setInterval(function () {
          _this6.$data.count > 0 && _this6.$data.count--;
        }, 1000);
        setTimeout(function () {
          clearInterval(_this6.$data.counttimer);
          _this6.$data.gamestart = true;
          _this6.$data.speed = 2;
        }, 4000);
      }

      return true;
    } else {
      return false;
    }
  }
}));
game.use('startbtn', (0, _chaos.ImageComponent)({
  scope: 'buttonstart',
  x: function x(w, h, $data) {
    return 126 / scale;
  },
  y: function y(w, h, $data) {
    if (h > 600) {
      return h / 2 - 90 / scale;
    }

    return h - 717 / scale;
  },
  width: function width(w, h, $data) {
    return 502 / scale;
  },
  height: function height(w, h, $data) {
    return 193 / scale;
  },
  operate: function operate() {
    if (this.$data.start === true) {
      return false;
    }
  },
  onClick: function onClick() {
    this.$data.start = true;
  }
}));
},{"../chaos":"../chaos/index.ts","./lib/index.less":"lib/index.less"}],"../node_modules/_parcel-bundler@1.12.3@parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59942" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/_parcel-bundler@1.12.3@parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/example.e31bb0bc.js.map