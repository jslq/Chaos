import { logger } from '../common/logger'
import { isUndefined } from '../common/utils'
import {
	ComponentType,
	ComponentNeedArguments,
} from '../common/constant'

interface attributeFun {
	(...args: any[]): any
}

interface convertedComponentOptionInterface {
	[propName: string]: any
}

function normalState(attribute: number | attributeFun, ...args) {
	if (typeof attribute === 'number') {
		return attribute
	}
	if (typeof attribute === 'function') {
		try {
			let res = Math.floor(Number(attribute(...args)))
			return res
		} catch (e) {
			logger.error(`组件参数 ${attribute.name} 解析错误`, e)
		}
	}
}

function createImageCanvas(image, w, h) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	canvas.width = w
	canvas.height = h
	ctx.save()
	ctx.drawImage(image, 0, 0, w, h)
	ctx.restore()
	return canvas
}

function imageState(getImage, width, height) {
	const images = getImage()
	let image = Array.isArray(images) ? images.map(image => createImageCanvas(image, width, height)) : createImageCanvas(images, width, height)
	return image
}

export default class FormedComponent {
	private _x
	private _y
	private _width
	private _height
	private _ratio
	public _canvasWidth
	public _canvasHeight
	public images
	public $data
	public $canvas
	public operate
	public beforeDraw
	get x() {
		return this._x / this._ratio
	}
	set x(val) {
		this._x = val * this._ratio
	}
	get y() {
		return this._y / this._ratio
	}
	set y(val) {
		this._y = val * this._ratio
	}
	get width() {
		return this._width / this._ratio
	}
	set width(val) {
		this._width = val * this._ratio
	}
	get height() {
		return this._height / this._ratio
	}
	set height(val) {
		this._height = val * this._ratio
	}
	constructor(component, w, h, canvas) {
		const { ratio, x, y, width, height, $data, getImage, operate = () => {} } = component
		Object.keys(component).forEach(_ => {
			this[_] = component[_]
		})
		this._ratio = ratio
		this.$canvas = canvas
		this._canvasWidth = w * ratio
		this._canvasHeight = h * ratio
		this.x = normalState(x, w, h, $data)
		this.y = normalState(y, w, h, $data)
		const $width   =  this.width = normalState(width, w, h, $data)
		const $height  =  this.height = normalState(height, w, h, $data)
		const $images  =  this.images = imageState(getImage, $width * ratio, $height * ratio)
		this.$data = $data
		this.operate = operate.bind(this, w, h)
		this.beforeDraw = function() {
			let errorHappened = false
			ComponentNeedArguments.forEach(_ => {
				if (isUndefined(this[_])) {
					errorHappened = true
					logger.error(`请正确计算 ${this.componentName} 的 ${_} 值`)
				}
			})
			const { componentType } = this
			if (componentType === ComponentType.Image) {
				try {
					const index = typeof this.index === 'function' && this.index.call(this, $data) || 0
					this.currentImage = Array.isArray(this.images) ? this.images[index] : this.images
				} catch(e) {
					errorHappened = true
					logger.error(`${this.componentName}图片取值错误`, e)
				}
			}
			return errorHappened
		}
	}
}
