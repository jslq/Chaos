import { CanvasEvent } from '../common/constant';
import { onEvent } from '../common/utils';
function checkVisible(component) {
    var _a = component.operate, operate = _a === void 0 ? function () { } : _a;
    if (operate() === false) {
        return false;
    }
    return true;
}
function checkWrappedIn(component, eventX, eventY) {
    var x = component.x, y = component.y, width = component.width, height = component.height;
    if (eventX >= x && eventX <= x + width && eventY >= y && eventY <= y + height) {
        return true;
    }
    return false;
}
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.eventStack = {};
        CanvasEvent.reduce(function (stack, eventType) {
            return stack[eventType] = [];
        }, this.eventStack);
    }
    Emitter.prototype.dispatch = function (eventType, x, y) {
        var dispatchedComponents = this.eventStack[eventType];
        dispatchedComponents.forEach(function (component) {
            if (!checkVisible(component))
                return;
            if (checkWrappedIn(component, x, y)) {
                component[onEvent(eventType)]();
            }
        });
    };
    Emitter.prototype.subscribe = function (eventType, component) {
        eventType = eventType.slice(2).toLowerCase();
        this.eventStack[eventType].push(component);
    };
    return Emitter;
}());
export default Emitter;
