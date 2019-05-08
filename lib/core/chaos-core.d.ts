import FormedComponent from './formedComponent';
export declare function calculate(component: any, w: any, h: any, canvas: any): FormedComponent;
export declare function registerCanvasEventListener(canvas: HTMLCanvasElement, emitter: any): void;
export default class ChaosCore {
    beforeCalculateStack: any;
    afterCalculateStack: any;
    copyAfterCalculateStack: any;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    emitter: any;
    ratio: any;
    constructor();
    storeCanvas(canvas: HTMLCanvasElement, ratio: number): void;
    loadAllComponents(components: any): void;
    loadEvent(components: any): void;
    loadDraw(components: any): void;
    push(choas: any, componentName: any, options: any): void;
    reset(): void;
    readonly _draw: () => void;
    draw(): void;
}
