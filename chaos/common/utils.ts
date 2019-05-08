import { logger } from './logger'

export function getDom(el: string | HTMLElement): HTMLElement | null {
	if (typeof el === 'string') {
		let dom = document.querySelector(el)
		if (!dom) {
			logger.warn(`无法找到指定元素${el}, 请检查参数`)
		}
		return dom as HTMLElement
	}
	return el
}

export function isUndefined(x) {
	return typeof x === 'undefined'
}

export function onEvent(eventType) {
	return `on${eventType.slice(0, 1).toUpperCase() + eventType.slice(1)}`
}

export function extend (to: object, _from: object): object {
	for (const key in _from) {
		to[key] = _from[key]
	}
	return to
}
