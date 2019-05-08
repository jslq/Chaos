import { logger } from '../common/logger';
import { isUndefined } from '../common/utils';
import { ComponentNeedArguments, } from '../common/constant';
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
        }
        catch (e) {
            logger.error("\u7EC4\u4EF6\u53C2\u6570 " + attribute.name + " \u89E3\u6790\u9519\u8BEF", e);
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
    var image = Array.isArray(images) ? images.map(function (image) { return createImageCanvas(image, width, height); }) : createImageCanvas(images, width, height);
    return image;
}
var FormedComponent = /** @class */ (function () {
    function FormedComponent(component, w, h, canvas) {
        var _this = this;
        var ratio = component.ratio, x = component.x, y = component.y, width = component.width, height = component.height, $data = component.$data, getImage = component.getImage, _a = component.operate, operate = _a === void 0 ? function () { } : _a;
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
            ComponentNeedArguments.forEach(function (_) {
                if (isUndefined(_this[_])) {
                    errorHappened = true;
                    logger.error("\u8BF7\u6B63\u786E\u8BA1\u7B97 " + _this.componentName + " \u7684 " + _ + " \u503C");
                }
            });
            var componentType = this.componentType;
            if (componentType === "Image" /* Image */) {
                try {
                    var index = typeof this.index === 'function' && this.index.call(this, $data) || 0;
                    this.currentImage = Array.isArray(this.images) ? this.images[index] : this.images;
                }
                catch (e) {
                    errorHappened = true;
                    logger.error(this.componentName + "\u56FE\u7247\u53D6\u503C\u9519\u8BEF", e);
                }
            }
            return errorHappened;
        };
    }
    Object.defineProperty(FormedComponent.prototype, "x", {
        get: function () {
            return this._x / this._ratio;
        },
        set: function (val) {
            this._x = val * this._ratio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormedComponent.prototype, "y", {
        get: function () {
            return this._y / this._ratio;
        },
        set: function (val) {
            this._y = val * this._ratio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormedComponent.prototype, "width", {
        get: function () {
            return this._width / this._ratio;
        },
        set: function (val) {
            this._width = val * this._ratio;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormedComponent.prototype, "height", {
        get: function () {
            return this._height / this._ratio;
        },
        set: function (val) {
            this._height = val * this._ratio;
        },
        enumerable: true,
        configurable: true
    });
    return FormedComponent;
}());
export default FormedComponent;
