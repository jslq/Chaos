export declare let logger: any;
declare class Logger {
    debug: boolean;
    prefix: string;
    _prefix: string;
    constructor(switchDebug: boolean);
    info(type: string, description?: string): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
}
export declare function createLogger(switchDebug: any): void;
export default Logger;
