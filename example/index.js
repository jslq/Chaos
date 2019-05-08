import Chaos, { ImageComponent} from '../chaos'
import './lib/index.less'
const gameImage = {
	adsense1: 'http://img.souche.com/f2e/479ffcc0a5daa24b742a2c93c8ef17a7.png',
	adsense12: 'http://img.souche.com/f2e/6d31022b1438d21327c9e19ab81c7aa2.png',
	adsenseleft: 'http://img.souche.com/f2e/c518e3ccd924239b0a301dc0ac228262.png',
	adsense3: 'http://img.souche.com/f2e/fb578c952474d2cee79e15899bf2e88e.png',
	adsense4: 'http://img.souche.com/f2e/1fc6f5803a43768b277ab7d42c002085.png',
	adsenseright: 'http://img.souche.com/f2e/1deec85e13aae52e91409f402ff16aa6.png',
	arrow: 'http://img.souche.com/f2e/0714aa1d6a89c6bdfccf35f48ca9917c.png',
	arrowleft: 'http://img.souche.com/f2e/4d67576a334882a76e577bf33dc1889c.png',
	arrowright: 'http://img.souche.com/f2e/649ae9b482d9cc4b16c7abc05d5af371.png',
	bg: 'http://img.souche.com/f2e/a6acbdc4d22b207174bab877683cd2c1.jpg',
	buttonstart: 'http://img.souche.com/f2e/42d006fb1975f2959dd51dd687c64dd2.png',
	car1: 'http://img.souche.com/f2e/369601c442dd51a33e60cf01b8e1acac.png',
	cars: ['http://img.souche.com/f2e/3d21cc01cb9445a0c298b511523c7f02.png', 'http://img.souche.com/f2e/32584cbd0754851b071ea37b5fd4bca2.png'],
	counts: ['http://img.souche.com/f2e/27cbf2bd8aa339d97bc7e4deeaff4cd0.png', 'http://img.souche.com/f2e/04dfeacc925f13db09acb2c72b071ce1.png', 'http://img.souche.com/f2e/3e01ea662cd56aa218523348cc46cd11.png', 'http://img.souche.com/f2e/84b8bde5b5457e9b36ae84f5e4a3aaa2.png'],
	flag: 'http://img.souche.com/f2e/5da2d86e46e311df4cf7a3a8959eb60c.png',
	frame: 'http://img.souche.com/f2e/ed5066078a713ed6efbccd61e2745910.png',
	go: 'http://img.souche.com/f2e/dd6793efe567a5dfffbcbb7064d4befb.png',
	leftroad: 'http://img.souche.com/f2e/4d44a79e4277f9ebf586efae77ee9d86.png',
	rightroad: 'http://img.souche.com/f2e/ac5bc4c868e9f5b68f20fcb359134c1d.png',
	startline: 'http://img.souche.com/f2e/35a15405c07167b4b54deaedfab7f2a7.png',
	logo: ['http://img.souche.com/f2e/c08f12151ff6530c45f2e8a3e91f85aa.png', 'http://img.souche.com/f2e/c08f12151ff6530c45f2e8a3e91f85aa.png']
}
const radio = 375 / document.body.clientWidth
const scale = radio * 2

function fn() {
	this.y --
}

function mutipleFn(fn, time) {
	while(time > 0) {
		time --
		fn()
	}
}

function createRandomFn() {
	let pre = 0
	let fn = function() {
		let x = Math.random()
		if (Math.abs(x - pre) < 0.2) {
			return fn()
		}
		pre = x
		return x
	}
	return fn
}

let getRandom = createRandomFn()

let game = new Chaos({
	debug: true,
	ratio: 3,
	globalData: {
		start: false,
		count: 3,
		speed: 2,
		gamestart: false,
		preparedone: false,
		lane: 2,
		currentlane: 2,
		speedtimer: null,
		counttimer: null,
		move: 0,
	},
	success() {
	},
	error(type, error) {
	}
})

game.loadImages(gameImage).mount('#container')

game.use('adsense3', ImageComponent({
	scope: 'adsense3',
	x(w, h, $data) {
		return 1
	},
	y(w, h, $data) {
		return h - 628 / scale
	},
	width(w, h, $data) {
		return 67 / scale
	},
	height(w, h, $data) {
		return 628 / scale
	}
}))

game.use('arrow1', ImageComponent({
	scope: 'arrow',
	x(w, h, $data) {
		return 13 / scale
	},
	y(w, h, $data) {
		return 28 / scale
	},
	width(w, h, $data) {
		return 43 / scale
	},
	height(w, h, $data) {
		return 214 / scale
	}
}))

game.use('arrow2', ImageComponent({
	scope: 'arrow',
	x(w, h, $data) {
		return w - 56 / scale
	},
	y(w, h, $data) {
		return 28 / scale
	},
	width(w, h, $data) {
		return 43 / scale
	},
	height(w, h, $data) {
		return 214 / scale
	}
}))

game.use('adsense1', ImageComponent({
	scope: 'adsense1',
	x(w, h, $data) {
		return 10 / scale
	},
	y(w, h, $data) {
		return h - 1080 / scale
	},
	width(w, h, $data) {
		return 67 / scale
	},
	height(w, h, $data) {
		return 169 / scale
	},
	operate(w, h) {
		if (h < 640) {
			return false
		}
	}
}))

game.use('adsense12', ImageComponent({
	scope: 'adsense12',
	x(w, h, $data) {
		return w - 77 / scale
	},
	y(w, h, $data) {
		return h - 1080 / scale
	},
	width(w, h, $data) {
		return 69 / scale
	},
	height(w, h, $data) {
		return 169 / scale
	},
	operate(w, h) {
		if (h < 640) {
			return false
		}
	}
}))

game.use('adsense4', ImageComponent({
	scope: 'adsense4',
	x(w, h, $data) {
		return w - 67 / scale - 1
	},
	y(w, h, $data) {
		return h - 628 / scale
	},
	width(w, h, $data) {
		return 67 / scale
	},
	height(w, h, $data) {
		return 628 / scale
	}
}))

game.use('adsenseleft', ImageComponent({
	scope: 'adsenseleft',
	x(w, h, $data) {
		return 0
	},
	y(w, h, $data) {
		return h - 905 / scale
	},
	width(w, h, $data) {
		return 69 / scale
	},
	height(w, h, $data) {
		return 252 / scale
	}
}))

game.use('adsenseright', ImageComponent({
	scope: 'adsenseright',
	x(w, h, $data) {
		return w - 69 / scale
	},
	y(w, h, $data) {
		return h - 905 / scale
	},
	width(w, h, $data) {
		return 69 / scale
	},
	height(w, h, $data) {
		return 252 / scale
	}
}))

game.use('startline', ImageComponent({
	scope: 'startline',
	x(w, h, $data) {
		return 110 / scale
	},
	y(w, h, $data) {
		return h - 521 / scale
	},
	width(w, h, $data) {
		return 532 / scale
	},
	height(w, h, $data) {
		return 88 / scale
	},
	operate() {
		const { gamestart, speed } = this.$data
		if (gamestart) {
			this.y += speed
		}
	}
}))

game.use('flag', ImageComponent({
	scope: 'flag',
	x(w, h, $data) {
		return w / 2 - 315 / scale / 2
	},
	y(w, h, $data) {
		return h - 137 / scale
	},
	width(w, h, $data) {
		return 315 / scale
	},
	height(w, h, $data) {
		return 137 / scale
	},
	operate() {
		const { gamestart } = this.$data
		if (gamestart) return false
	}
}))

function getCarY(b, c, h) {
	let a = -Math.floor(Math.random() * (1 * h) + 228 / scale)
	if (Math.abs(a - b) < 320 / scale) return getCarY(b, c, h)
	if (Math.abs(a - c) < 320 / scale) return getCarY(b, c, h)
	if (Math.abs(b - c) < 320 / scale) return getCarY(b, c, h)
	return a
}

function carFn(w, h) {
	const { gamestart, speed, preparedone } = this.$data
	if (gamestart === true) {
		if (preparedone === true) {
			this.y += speed
			if(this.y >= h) {
				this.carindex = Math.floor(Math.random() * 2)
				if (this.componentName === 'car1') {
					this.y = getCarY(this.$components.car2.y, this.$components.car3.y, h)
				} else if (this.componentName === 'car2') {
					this.y = getCarY(this.$components.car1.y, this.$components.car3.y, h)
				} else {
					this.y = getCarY(this.$components.car1.y, this.$components.car2.y, h)
				}
			}
			let { x, y, width, height } = this
			let { x: mx, y: my, width: mwidth, height: mheight} = this.$components.mycar
			x = x + 20 / scale
			y = y + 20 / scale
			width = width - 40 / scale
			height = height - 60 / scale
			mx = mx + 20 / scale
			my = my + 20 / scale
			mwidth = mwidth - 40 / scale
			mheight = mheight - 60 / scale
			if (
				mx >= x && mx <= x + width && my >= y && my <= y + height ||
				mx + mwidth >= x && mx + mwidth <= x + width && my >= y && my <= y + height ||
				mx >= x && mx <= x + width && my + mheight >= y && my + mheight <= y + height ||
				mx + mwidth >= x && mx + mwidth <= x + width && my + mheight >= y && my + mheight <= y + height
			) {
				game.reset()
			}
		} else {
			this.y -= this.selfspeed
		}
	}
}

game.use('car1', ImageComponent({
	scope: 'cars',
	index() {
		return this.carindex
	},
	carindex: 0,
	x(w, h, $data) {
		return 143 / scale
	},
	y(w, h, $data) {
		return h - 396 / scale
	},
	width(w, h, $data) {
		return 113 / scale
	},
	height(w, h, $data) {
		return 228 / scale
	},
	selfspeed: Math.ceil(Math.random() * 3),
 	operate(w, h) {
		carFn.call(this, w, h)
	}
}))

game.use('car2', ImageComponent({
	scope: 'cars',
	index() {
		return this.carindex
	},
	carindex: 1,
	x(w, h, $data) {
		return 505 / scale
	},
	y(w, h, $data) {
		return h - 396 / scale
	},
	width(w, h, $data) {
		return 113 / scale
	},
	height(w, h, $data) {
		return 228 / scale
	},
	selfspeed: Math.ceil(Math.random() * 3),
	operate(w, h) {
		carFn.call(this, w, h)
	},
}))

game.use('car3', ImageComponent({
	scope: 'cars',
	index() {
		return this.carindex
	},
	carindex: 0,
	x(w, h, $data) {
		return 324 / scale
	},
	y(w, h, $data) {
		return -(228 / scale)
	},
	width(w, h, $data) {
		return 113 / scale
	},
	height(w, h, $data) {
		return 228 / scale
	},
	selfspeed: Math.ceil(Math.random() * 3),
	operate(w, h) {
		carFn.call(this, w, h)
	},
}))

game.use('mycar', ImageComponent({
	scope: 'car1',
	x(w, h, $data) {
		return 324 / scale
	},
	y(w, h, $data) {
		return h - 396 / scale
	},
	width(w, h, $data) {
		return 113 / scale
	},
	height(w, h, $data) {
		return 228 / scale
	},
	operate(w, h) {
		const { gamestart, preparedone, speed, lane, currentlane } = this.$data
		if (gamestart ===  true) {
			this.y -= speed
			if (this.y <= h - 700 / scale) {
				this.y = h - 700 / scale
				this.$data.preparedone = true
				!this.$data.speedtimer && (this.$data.speedtimer = setInterval(() => {
					this.$data.speed += 0.1
				}, 500))
			}
			if (preparedone === true) {
				mutipleFn(() => {
					if (currentlane > lane && Math.abs(this.$data.move) >= 1) {
						this.x --
						this.$data.move ++
					} else if (currentlane < lane && Math.abs(this.$data.move) >= 1) {
						this.x ++
						this.$data.move --
					} else {
						this.$data.currentlane = this.$data.lane
					}
				}, 3 + Math.floor(speed))
			}
		}
	}
}))

game.use('arrowleft', ImageComponent({
	scope: 'arrowleft',
	x(w, h, $data) {
		return 98 / scale
	},
	y(w, h, $data) {
		return h - 182 / scale
	},
	width(w, h, $data) {
		return 182 / scale
	},
	height(w, h, $data) {
		return 182 / scale
	},
	operate() {
	},
	onClick() {
		const { gamestart, lane, currentlane } = this.$data
		if (gamestart) {
			if (lane !== currentlane) return
			if (lane > 1) {
				this.$data.lane -= 1
				this.$data.move = -(180 / scale)
			}
		}
	}
}))

game.use('arrowright', ImageComponent({
	scope: 'arrowright',
	x(w, h, $data) {
		return w - 279 / scale
	},
	y(w, h, $data) {
		return h - 182 / scale
	},
	width(w, h, $data) {
		return 182 / scale
	},
	height(w, h, $data) {
		return 182 / scale
	},
	operate() {
	},
	onClick() {
		const { gamestart, lane, currentlane } = this.$data
		if (gamestart) {
			if (lane !== currentlane) return
			if (lane < 3) {
				this.$data.lane += 1
				this.$data.move = 180 / scale
			}
		}
	}
}))

game.use('leftroad', ImageComponent({
	scope: 'leftroad',
	x(w, h, $data) {
		return 62 / scale
	},
	y(w, h, $data) {
		return 0
	},
	width(w, h, $data) {
		return 37 / scale
	},
	height(w, h, $data) {
		return 1334 / scale
	},
	operate(w, h) {
		const { gamestart, speed } = this.$data
		if (gamestart === true) {
			mutipleFn(() => {
				if (this.y >= h ) {
					this.y = -h
				}
				this.y ++
			}, Math.floor(speed) > 15 ? 15 : Math.floor(speed))
		}
	},
	draw(ctx, w, h, ratio, $data) {
		ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, (37 / scale) * ratio, h * ratio)
	},
}))

game.use('leftroad1', ImageComponent({
	scope: 'leftroad',
	x(w, h, $data) {
		return 62 / scale
	},
	y(w, h, $data) {
		return -h
	},
	width(w, h, $data) {
		return 37 / scale
	},
	height(w, h, $data) {
		return 1334 / scale
	},
	operate(w, h) {
		const { gamestart, speed } = this.$data
		if (gamestart === true) {
			mutipleFn(() => {
				if (this.y >= h ) {
					this.y = -h
				}
				this.y ++
			}, Math.floor(speed) > 15 ? 15 : Math.floor(speed))
		}
	},
	draw(ctx, w, h, ratio) {
		ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, Math.floor((37 / scale) * ratio), h * ratio)
	},
}))

game.use('rightroad', ImageComponent({
	scope: 'rightroad',
	x(w, h, $data) {
		return w - 100 / scale
	},
	y(w, h, $data) {
		return 0
	},
	width(w, h, $data) {
		return 37 / scale
	},
	height(w, h, $data) {
		return 1334 / scale
	},
	operate(w, h) {
		const { gamestart, speed } = this.$data
		if (gamestart === true) {
			mutipleFn(() => {
				if (this.y >= h ) {
					this.y = -h
				}
				this.y ++
			}, Math.floor(speed) > 15 ? 15 : Math.floor(speed))
		}
	},
	draw(ctx, w, h, ratio, $data) {
		ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, (37 / scale) * ratio, h * ratio)
	},
}))

game.use('rightroad1', ImageComponent({
	scope: 'rightroad',
	x(w, h, $data) {
		return w - 100 / scale
	},
	y(w, h, $data) {
		return -h
	},
	width(w, h, $data) {
		return 37 / scale
	},
	height(w, h, $data) {
		return 1334 / scale
	},
	operate(w, h) {
		const { gamestart, speed } = this.$data
		if (gamestart === true) {
			mutipleFn(() => {
				if (this.y >= h ) {
					this.y = -h
				}
				this.y ++
			}, Math.floor(speed) > 15 ? 15 : Math.floor(speed))
		}
	},
	draw(ctx, w, h, ratio, $data) {
		ctx.drawImage(this.currentImage, this.x * ratio, this.y * ratio, (37 / scale) * ratio, h * ratio)
	},
}))

game.use('counts', ImageComponent({
	scope: 'counts',
	index($data) {
		return $data.count
	},
	x(w, h, $data) {
		return w / 2  - 234 / scale / 2
	},
	y(w, h, $data) {
		if (h > 600) {
			return h / 2 - 180
		}
		return h - 900 / scale
	},
	width(w, h, $data) {
		return 234 / scale
	},
	height(w, h, $data) {
		return 194 / scale
	},
	operate() {
		if (this.$data.start === true) {
			if (this.$data.gamestart) return false
			if (!this.$data.counttimer) {
				this.$data.counttimer = setInterval(() => {
					this.$data.count > 0 && this.$data.count --
				}, 1000)
				setTimeout(() => {
					clearInterval(this.$data.counttimer)
					this.$data.gamestart = true
					this.$data.speed = 2
				}, 4000)
			}
			return true
		} else {
			return false
		}
	},
}))

game.use('startbtn', ImageComponent({
	scope: 'buttonstart',
	x(w, h, $data) {
		return 126 / scale
	},
	y(w, h, $data) {
		if ( h > 600) {
			return h / 2 - 90 / scale
		}
		return h - 717 / scale
	},
	width(w, h, $data) {
		return 502 / scale
	},
	height(w, h, $data) {
		return 193 / scale
	},
	operate() {
		if (this.$data.start === true) {
			return false
		}
	},
	onClick() {
		this.$data.start = true
	}
}))
