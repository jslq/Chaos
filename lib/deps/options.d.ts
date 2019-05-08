export interface ChaosOptions {
    debug?: number;
    ratio?: number;
    canvasWidth?: number;
    canvasHeight?: number;
    mountedElement?: HTMLElement;
    globalData?: any;
    success?: () => void;
    error?: (type: any, error: any) => void;
}
