import { FRAMEWORK } from './constant';
export var logger;
var Logger = /** @class */ (function () {
    function Logger(switchDebug) {
        this.debug = switchDebug;
        this.prefix = FRAMEWORK + ":";
        this._prefix = "%c" + FRAMEWORK + ":";
    }
    Logger.prototype.info = function (type, description) {
        if (description === void 0) { description = ''; }
        if (this.debug)
            window.console.info(this._prefix + ("%c" + type), 'color: blue; font-weight: 600', 'color: #333333', description);
    };
    Logger.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug)
            (_a = window.console).error.apply(_a, [this.prefix].concat(args));
    };
    Logger.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug)
            (_a = window.console).warn.apply(_a, [this.prefix].concat(args));
    };
    return Logger;
}());
export function createLogger(switchDebug) {
    logger = new Logger(switchDebug);
}
export default Logger;
