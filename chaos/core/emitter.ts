import { CanvasEvent } from '../common/constant'
import { logger } from '../common/logger'
import { onEvent } from '../common/utils'

function checkVisible(component) {
	const { operate = () => {} } = component
	if (operate() === false) {
		return false
	}
	return true
}

function checkWrappedIn(component, eventX, eventY) {
	const { x, y, width, height } = component
	if (eventX >= x && eventX <= x + width && eventY >= y && eventY <= y + height) {
		return true
	}
	return false
}

export default class Emitter {
	public eventStack = {}
	constructor() {
		CanvasEvent.reduce((stack, eventType) => {
			return stack[eventType] = []
		}, this.eventStack)
	}
	public dispatch(eventType, x, y) {
		let dispatchedComponents = this.eventStack[eventType]
		dispatchedComponents.forEach((component) => {
			if (!checkVisible(component)) return
			if (checkWrappedIn(component, x, y)) {
				component[onEvent(eventType)]()
			}
		})
	}
	public subscribe(eventType, component) {
		eventType = eventType.slice(2).toLowerCase()
		this.eventStack[eventType].push(component)
	}
}
