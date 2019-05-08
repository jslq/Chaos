import { LoaderInterface, resInterface } from '../deps/interface'
import { loadImgResourse, convertArrToObj } from '../deps/imgLoader'

export default class Loader implements LoaderInterface{
	public _res: resInterface
	constructor() {
		this._res = {}
	}
	public loadImages(imgs: object): Promise<void> {
		this._res.images = {}
		return loadImgResourse(imgs)
			.then((imgsSourceBack) => {
				this._res.images = convertArrToObj(imgsSourceBack)
			})
	}
}
