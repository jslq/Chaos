import { logger } from './logger';
export function getDom(el) {
    if (typeof el === 'string') {
        var dom = document.querySelector(el);
        if (!dom) {
            logger.warn("\u65E0\u6CD5\u627E\u5230\u6307\u5B9A\u5143\u7D20" + el + ", \u8BF7\u68C0\u67E5\u53C2\u6570");
        }
        return dom;
    }
    return el;
}
export function isUndefined(x) {
    return typeof x === 'undefined';
}
export function onEvent(eventType) {
    return "on" + (eventType.slice(0, 1).toUpperCase() + eventType.slice(1));
}
export function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}
