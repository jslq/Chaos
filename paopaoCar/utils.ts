export const RAF = (fn, frame) => {
	if(window.requestAnimationFrame) {
		return window.requestAnimationFrame(fn)
	} else {
		return window.setInterval(fn, frame)
	}
}

export const getImage = (imgurl: string) => {
	return new Promise((resolve, reject) => {
		let img = new Image()
		img.onload = () => {
			resolve(img)
		}
		img.src = imgurl
	})
}
