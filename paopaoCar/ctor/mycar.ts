import Operator from './operator'
const car = require('../../lib/imgs/mycar.png')

export default class Mycar {
	oper;
	config;
	car;
	x;
	constructor(myCarConfig) {
		this.oper = new Operator(this, myCarConfig.game)
		this.config = myCarConfig
		let img = new Image()
		img.src= car
		this.car = img
		this.x = 150
	}
	start() {
		this.paint()
	}
	paint() {
		const { oper } = this
		const { ctx, game } = this.config
		ctx.drawImage(oper.canvas, 30, 600, 300, 50)
		ctx.drawImage(this.car, this.x, 500, 30, 80)
	}
	turnLeft() {
		this.x -= 10
	}
	turnRight() {
		this.x += 10
	}
}
