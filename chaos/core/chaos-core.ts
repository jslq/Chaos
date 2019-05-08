import { logger } from '../common/logger';
import { CanvasEvent } from '../common/constant'
import FormedComponent from './formedComponent'
import { onEvent, extend } from '../common/utils'
import Emitter from './emitter'

export function calculate(component, w, h, canvas) {
	return new FormedComponent(component, w, h, canvas)
}

export function registerCanvasEventListener(canvas: HTMLCanvasElement, emitter) {
	function callback(event) {
		const { offsetX, offsetY } =  event
		emitter.dispatch(this, offsetX, offsetY)
	}
	CanvasEvent.forEach((evnetType) => {
		canvas.addEventListener(evnetType, callback.bind(evnetType))
	})
}

export default class ChaosCore {
	public beforeCalculateStack
	public afterCalculateStack
	public copyAfterCalculateStack
	public ctx: CanvasRenderingContext2D
	public canvas: HTMLCanvasElement
	public emitter
	public ratio
	constructor() {
		this.beforeCalculateStack = []
		this.afterCalculateStack = []
		this.copyAfterCalculateStack = []
		this.emitter = new Emitter()
	}
	public storeCanvas(canvas: HTMLCanvasElement, ratio: number) {
		this.canvas = canvas
		this.ratio = ratio
		const { width, height } = canvas
		this.ctx = canvas.getContext('2d')
		registerCanvasEventListener(canvas, this.emitter)
		this.afterCalculateStack = this.beforeCalculateStack.map(component => { return calculate(component, width / ratio, height /ratio, canvas)})
		this.loadEvent(this.afterCalculateStack)
		this.loadDraw(this.afterCalculateStack)
		this.loadAllComponents(this.afterCalculateStack)
		this.copyAfterCalculateStack = this.afterCalculateStack.map((component) => {return Object.assign({}, component)})
		this.draw()
	}
	public loadAllComponents(components) {
		components.forEach((component) => {
			component.$components = {}
			components.reduce((loadObject, component) => {
				loadObject[component.componentName] = component
				return loadObject
			}, component.$components)
		})
	}
	public loadEvent(components) {
		const events = CanvasEvent.map((event) => {
			return onEvent(event)
		})
		components.forEach((component) => {
			for (var event of events) {
				if (component[event] && typeof component[event] === 'function') {
					component[event] = component[event].bind(component)
					this.emitter.subscribe(event, component)
				}
			}
		})
	}
	public loadDraw(components) {
		let self = this
		const { width, height } = this.canvas
		const ratio = this.ratio
		function defaultDraw() {
			const { operate, currentImage, _x, _y } = this
			try {
				let cancelable = operate()
				if (cancelable === false) return
				self.ctx.drawImage(currentImage, this._x, this._y)
			} catch (e) {
				logger.error(e)
			}
		}
		components.forEach((component) => {
			const { draw, currentImage, operate, $data} = component
			component.draw = draw ? () => {
				try {
					let cancelable = operate()
					if (cancelable === false) return
					draw.call(component, self.ctx, width / ratio, height / ratio, ratio)
				} catch (e) {
					logger.error(e)
				}
			} : defaultDraw.bind(component)
		})
	}
	public push(choas, componentName, options) {
		this.beforeCalculateStack.push(Object.assign({}, options, {componentName}))
	}
	public reset() {
		this.afterCalculateStack.forEach((component) => {
			let mirror = this.copyAfterCalculateStack.filter((_) => {
				return component.componentName === _.componentName
			})[0]
			extend(component, mirror)
		})
	}
	get _draw() {
		return () => {
			const { width, height } = this.canvas
			this.ctx.clearRect(0, 0, width, height)
			this.afterCalculateStack.forEach((component) => {
				if (component.beforeDraw()) return
				component.draw()
			})
			window.requestAnimationFrame(this._draw)
		}
	}
	public draw() {
		this._draw()
	}
}
