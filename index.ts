const imgUrl = require('./lib/imgs/road.png')
import "./lib/index.less"
import PaoPaoCar from './paopaoCar/index'

let game = new PaoPaoCar({
	container: document.getElementById('container'),
	playgroundBg: imgUrl,
})

game.start()

