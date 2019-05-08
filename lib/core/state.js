import { extend } from '../common/utils';
var State = /** @class */ (function () {
    function State(globalData) {
        State.cache = Object.assign({}, globalData);
        extend(this, globalData);
    }
    State.prototype.reset = function () {
        extend(this, State.cache);
    };
    return State;
}());
export default State;
