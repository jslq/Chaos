import { ChaosOptions } from './deps/options'
import { clone } from './common/clone'
import { getDom } from './common/utils'
import Loader from './core/loader'
import ChaosCore from './core/chaos-core'
import { LoaderInterface } from './deps/interface'
import Logger, { createLogger, logger } from './common/logger';
import State from './core/state'

class Chaos {
	public options: ChaosOptions
	public mountedElement: HTMLElement | null
	public canvas: HTMLCanvasElement
	public _loader: LoaderInterface
	public _mounted: boolean = false
	public _canvasWidth
	public _canvasHeight
	public _core
	public coreOptions
	public $state
	constructor(options: ChaosOptions = {}) {
		this._core = new ChaosCore()
		this._loader = new Loader()
		this.options = clone(options)
		const { globalData = {}, debug = true, ratio = 1 } = this.options
		this.$state = new State(globalData)
		createLogger(debug)
		this.coreOptions = {
			$data: this.$state,
			ratio,
		}
	}
	public loadImages(imgs) {
		const { error = () => {} } = this.options
		this._loader.loadImages(imgs)
			.then(_ => this._mount())
			.catch(e => {
				logger.error(e)
			})
		return this
	}
	public generateCanvas(w: number, h: number): HTMLCanvasElement {
		let canvas = document.createElement('canvas')
		canvas.width = w
		canvas.height = h
		return canvas
	}
	public beforeMount() {
		const { canvasWidth, canvasHeight, ratio } = this.options
		if (canvasWidth && canvasHeight) {
			return this.generateCanvas(canvasWidth, canvasHeight)
		}
		const { mountedElement } = this
		const { clientWidth, clientHeight } = mountedElement
		return this.generateCanvas(clientWidth * ratio, clientHeight * ratio)
	}
	public _mount() {
		const { success = () => {}, ratio } = this.options
		if (!this._mounted) {
			logger.error(`请调用mount方法`)
		}
		const canvas = this.canvas = this.beforeMount()
		this._core.storeCanvas(canvas, ratio)
		this.mountedElement.append(canvas)
		success()
	}
	public use(componentName, component) {
		this._core.push(this, componentName, component(this.coreOptions, this._loader))
	}
	public reset() {
		this.$state.reset()
		this._core.reset()
	}
	public mount(el: HTMLElement | undefined | string) {
		if (typeof el === undefined && typeof this.options.mountedElement === undefined) {
			this.mountedElement = document.body
		}
		this.mountedElement = getDom(el || this.options.mountedElement)
		this._mounted = true
		return this
	}
}

export default Chaos
