interface PGConfig {
	img: HTMLImageElement; //背景图片
	w: number;             //画布宽度
	h: number;             //画布高度
	ctx;                   //canvas上下文
	game;                  //游戏实例
}

export default class PlayGround {
	y1;
	y2;
	config;
	constructor(config: PGConfig) {
		const { h } = config
		this.config = config

		this.y1 = 0   //第一张背景图的y轴
		this.y2 = -h  //第二章北京图的y轴
	}
	start() {
		this.paint()
		this.step()
	}
	paint() {
		const { ctx, img, w, h } = this.config

		ctx.drawImage(img, 0, this.y1, w, h)
		ctx.drawImage(img, 0, this.y2, w, h)
	}
	step() {
		const { h } = this.config
		this.y1 += 1
		this.y2 += 1
		this.y1 >= h && (this.y1 = -h)
		this.y2 >= h && (this.y2 = -h)
	}
}
