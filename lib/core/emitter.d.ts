export default class Emitter {
    eventStack: {};
    constructor();
    dispatch(eventType: any, x: any, y: any): void;
    subscribe(eventType: any, component: any): void;
}
