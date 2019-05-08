import { clone } from './common/clone';
import { getDom } from './common/utils';
import Loader from './core/loader';
import ChaosCore from './core/chaos-core';
import { createLogger, logger } from './common/logger';
import State from './core/state';
var Chaos = /** @class */ (function () {
    function Chaos(options) {
        if (options === void 0) { options = {}; }
        this._mounted = false;
        this._core = new ChaosCore();
        this._loader = new Loader();
        this.options = clone(options);
        var _a = this.options, _b = _a.globalData, globalData = _b === void 0 ? {} : _b, _c = _a.debug, debug = _c === void 0 ? true : _c, _d = _a.ratio, ratio = _d === void 0 ? 1 : _d;
        this.$state = new State(globalData);
        createLogger(debug);
        this.coreOptions = {
            $data: this.$state,
            ratio: ratio,
        };
    }
    Chaos.prototype.loadImages = function (imgs) {
        var _this = this;
        var _a = this.options.error, error = _a === void 0 ? function () { } : _a;
        this._loader.loadImages(imgs)
            .then(function (_) { return _this._mount(); })
            .catch(function (e) {
            logger.error(e);
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
        var _a = this.options, canvasWidth = _a.canvasWidth, canvasHeight = _a.canvasHeight, ratio = _a.ratio;
        if (canvasWidth && canvasHeight) {
            return this.generateCanvas(canvasWidth, canvasHeight);
        }
        var mountedElement = this.mountedElement;
        var clientWidth = mountedElement.clientWidth, clientHeight = mountedElement.clientHeight;
        return this.generateCanvas(clientWidth * ratio, clientHeight * ratio);
    };
    Chaos.prototype._mount = function () {
        var _a = this.options, _b = _a.success, success = _b === void 0 ? function () { } : _b, ratio = _a.ratio;
        if (!this._mounted) {
            logger.error("\u8BF7\u8C03\u7528mount\u65B9\u6CD5");
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
        if (typeof el === undefined && typeof this.options.mountedElement === undefined) {
            this.mountedElement = document.body;
        }
        this.mountedElement = getDom(el || this.options.mountedElement);
        this._mounted = true;
        return this;
    };
    return Chaos;
}());
export default Chaos;
