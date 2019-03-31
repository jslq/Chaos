import PlayGround from './ctor/playground'
import MyCar from './ctor/mycar'
import { RAF } from './utils'

interface Gameconfig {
	container: HTMLElement;
	playgroundBg: string;
	frameRate?: number;
}

enum State {
	STARTTING, //游戏欢迎阶段
	START,     //游戏过渡阶段
	RUNNING,   //游戏运行阶段
	PAUSED,    //游戏暂停阶段
	GAMEOVER,  //游戏结束阶段
}

export default class PaoPaoCar {
	canvas;     //画布
	context;    //画布上下文
	config;     //配置
	state: State = State.STARTTING    //游戏状态
	bg;
	myCar;
	constructor(config: Gameconfig) {
		const {
			playgroundBg,
			frameRate = 16,   //默认24帧
		} = config

		this.config = config

		let { w, h } = this.createCtx()

		let imgg = document.createElement('img')

		this.bg = this.createPg(playgroundBg, w, h)
		this.myCar = this.createMyCar()
	}
	loop() {
		const { config, bg, myCar } = this
		let _this = this
		//动画所有内容
		bg.start()
		myCar.start()
		RAF(_this.loop.bind(_this), config.frameRate)
	}
	start() {
		this.state = State.RUNNING
		this.loop()
	}
	load() {

	}
	createCtx() {
		const { container } = this.config
		let w = container.offsetWidth
		let h = container.offsetHeight
		let canvas = this.canvas = document.createElement('canvas')
		let context = this.context = canvas.getContext('2d')
		canvas.width = w
		canvas.height = h
		container.append(canvas)
		return { w, h }
	}
	createPg(playgroundBg, w:number, h: number) {
		let img = new Image()
		let self = this
		let pg = new PlayGround({
			img,
			w,
			h,
			ctx: self.context,
			game: self
		})
		img.src = playgroundBg
		img.onload = () => {
			pg.start()
		}

		return pg
	}
	createMyCar() {
		let self = this
		return new MyCar({
			ctx: self.context,
			game: self
		})
	}
}
