import { loadImgResourse, convertArrToObj } from '../deps/imgLoader';
var Loader = /** @class */ (function () {
    function Loader() {
        this._res = {};
    }
    Loader.prototype.loadImages = function (imgs) {
        var _this = this;
        this._res.images = {};
        return loadImgResourse(imgs)
            .then(function (imgsSourceBack) {
            _this._res.images = convertArrToObj(imgsSourceBack);
        });
    };
    return Loader;
}());
export default Loader;
