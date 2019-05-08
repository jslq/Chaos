import { logger } from '../common/logger';
import { CanvasEvent } from '../common/constant';
import FormedComponent from './formedComponent';
import { onEvent, extend } from '../common/utils';
import Emitter from './emitter';
export function calculate(component, w, h, canvas) {
    return new FormedComponent(component, w, h, canvas);
}
export function registerCanvasEventListener(canvas, emitter) {
    function callback(event) {
        var offsetX = event.offsetX, offsetY = event.offsetY;
        emitter.dispatch(this, offsetX, offsetY);
    }
    CanvasEvent.forEach(function (evnetType) {
        canvas.addEventListener(evnetType, callback.bind(evnetType));
    });
}
var ChaosCore = /** @class */ (function () {
    function ChaosCore() {
        this.beforeCalculateStack = [];
        this.afterCalculateStack = [];
        this.copyAfterCalculateStack = [];
        this.emitter = new Emitter();
    }
    ChaosCore.prototype.storeCanvas = function (canvas, ratio) {
        this.canvas = canvas;
        this.ratio = ratio;
        var width = canvas.width, height = canvas.height;
        this.ctx = canvas.getContext('2d');
        registerCanvasEventListener(canvas, this.emitter);
        this.afterCalculateStack = this.beforeCalculateStack.map(function (component) { return calculate(component, width / ratio, height / ratio, canvas); });
        this.loadEvent(this.afterCalculateStack);
        this.loadDraw(this.afterCalculateStack);
        this.loadAllComponents(this.afterCalculateStack);
        this.copyAfterCalculateStack = this.afterCalculateStack.map(function (component) { return Object.assign({}, component); });
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
        var events = CanvasEvent.map(function (event) {
            return onEvent(event);
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
        var _a = this.canvas, width = _a.width, height = _a.height;
        var ratio = this.ratio;
        function defaultDraw() {
            var _a = this, operate = _a.operate, currentImage = _a.currentImage, _x = _a._x, _y = _a._y;
            try {
                var cancelable = operate();
                if (cancelable === false)
                    return;
                self.ctx.drawImage(currentImage, this._x, this._y);
            }
            catch (e) {
                logger.error(e);
            }
        }
        components.forEach(function (component) {
            var draw = component.draw, currentImage = component.currentImage, operate = component.operate, $data = component.$data;
            component.draw = draw ? function () {
                try {
                    var cancelable = operate();
                    if (cancelable === false)
                        return;
                    draw.call(component, self.ctx, width / ratio, height / ratio, ratio);
                }
                catch (e) {
                    logger.error(e);
                }
            } : defaultDraw.bind(component);
        });
    };
    ChaosCore.prototype.push = function (choas, componentName, options) {
        this.beforeCalculateStack.push(Object.assign({}, options, { componentName: componentName }));
    };
    ChaosCore.prototype.reset = function () {
        var _this = this;
        this.afterCalculateStack.forEach(function (component) {
            var mirror = _this.copyAfterCalculateStack.filter(function (_) {
                return component.componentName === _.componentName;
            })[0];
            extend(component, mirror);
        });
    };
    Object.defineProperty(ChaosCore.prototype, "_draw", {
        get: function () {
            var _this = this;
            return function () {
                var _a = _this.canvas, width = _a.width, height = _a.height;
                _this.ctx.clearRect(0, 0, width, height);
                _this.afterCalculateStack.forEach(function (component) {
                    if (component.beforeDraw())
                        return;
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
}());
export default ChaosCore;
