import { logger } from '../common/logger';
import { isUndefined } from '../common/utils';
import { ImageComponentNeedArguments } from '../common/constant';
export function ImageComponent(options) {
    ImageComponentNeedArguments.forEach(function (_) {
        if (isUndefined(options[_])) {
            logger.warn("\u56FE\u7247\u7EC4\u4EF6\u9700\u8981\u53C2\u6570 " + _);
        }
    });
    return function (coreOptions, loader) {
        return Object.assign({}, coreOptions, options, {
            componentType: "Image" /* Image */,
            getImage: function () {
                var image = loader._res.images[options.scope];
                if (!image) {
                    logger.warn("\u672A\u627E\u5230\u8BE5scope: " + options.scope + "\u7684\u56FE\u7247\u8D44\u6E90,\u8BF7\u68C0\u67E5scope");
                }
                return image;
            }
        });
    };
}
