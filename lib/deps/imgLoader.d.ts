interface imgobj {
    name: string;
    url?: string;
    img?: HTMLImageElement;
}
interface originObj {
    [propName: string]: string;
}
export declare const loadImgResourse: (obj: any) => Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
export declare function flatten(arr: any): any;
export declare function convertArrToObj(arr: any): any;
export declare function getObjectKeyValueToArray(obj: originObj): any[];
export declare function createImgPromise(imgobj: imgobj): Promise<{}>;
export {};
