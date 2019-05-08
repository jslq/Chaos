export interface LoaderInterface {
    _res: resInterface;
    loadImages: (imgs: string[]) => Promise<void>;
}
export interface resInterface {
    images?: object;
}
