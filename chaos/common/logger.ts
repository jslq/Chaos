import { FRAMEWORK} from './constant'
export let logger

class Logger {
	public debug: boolean
	public prefix: string
	public _prefix: string
	constructor(switchDebug: boolean) {
		this.debug = switchDebug
		this.prefix = `${FRAMEWORK}:`
		this._prefix = `%c${FRAMEWORK}:`
	}
	public info(type: string, description: string = '') : void {
		if (this.debug) window.console.info(this._prefix + `%c${type}`, 'color: blue; font-weight: 600', 'color: #333333', description)
	}
	public error(...args: any[]): void {
		if (this.debug) window.console.error(this.prefix, ...args)
	}
	public warn(...args: any[]): void {
		if(this.debug) window.console.warn(this.prefix, ...args)
	}
}

export function createLogger(switchDebug) {
	logger = new Logger(switchDebug)
}

export default Logger
