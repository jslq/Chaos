import { LoaderInterface, resInterface } from '../deps/interface';
export default class Loader implements LoaderInterface {
    _res: resInterface;
    constructor();
    loadImages(imgs: object): Promise<void>;
}
