import { ChaosOptions } from './deps/options';
import { LoaderInterface } from './deps/interface';
declare class Chaos {
    options: ChaosOptions;
    mountedElement: HTMLElement | null;
    canvas: HTMLCanvasElement;
    _loader: LoaderInterface;
    _mounted: boolean;
    _canvasWidth: any;
    _canvasHeight: any;
    _core: any;
    coreOptions: any;
    $state: any;
    constructor(options?: ChaosOptions);
    loadImages(imgs: any): this;
    generateCanvas(w: number, h: number): HTMLCanvasElement;
    beforeMount(): HTMLCanvasElement;
    _mount(): void;
    use(componentName: any, component: any): void;
    reset(): void;
    mount(el: HTMLElement | undefined | string): this;
}
export default Chaos;
