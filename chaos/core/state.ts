import { extend } from '../common/utils'

export default class State {
	static cache
	constructor(globalData) {
		State.cache = Object.assign({}, globalData)
		extend(this, globalData)
	}
	public reset() {
		extend(this, State.cache)
	}
}
