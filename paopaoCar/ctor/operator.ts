import { getImage } from '../utils'
const left = require('../../lib/imgs/left.png')
const right = require('../../lib/imgs/right.png')

export default class Operator {
	canvas;
	constructor(myCar, game) {
		let canvas = document.createElement('canvas')
		let context = canvas.getContext('2d')
		let self = this

		game.canvas.onclick = (event) => {
			if(event.layerX > 30 && event.layerX < 80 && event.layerY > 600 && event.layerY < 650) {
				myCar.turnLeft()
			}
			if(event.layerX > 280 && event.layerX < 330 && event.layerY > 600 && event.layerY < 650) {
				myCar.turnRight()
			}
		}

		Promise.all([getImage(left), getImage(right)])
			.then((res) => {
				self.paint(context, res)
				myCar.paint()
			})
		canvas.width = 300
		canvas.height = 50
		this.canvas = canvas
	}
	paint(context, imgs) {
		context.save()
		context.drawImage(imgs[0], 0, 0, 50, 50)
		context.drawImage(imgs[1], 250, 0, 50, 50)
		context.restore()
	}
}
