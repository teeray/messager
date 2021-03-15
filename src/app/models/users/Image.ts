import { HIDC } from "../base/hidc";

export class Image extends HIDC {
    file: string = '';
    constructor(obj: Image = {} as Image) {
        super(obj);
        const {
            file = '',
        } = obj;
        this.file = file;
    }
    update(obj: Image = {} as Image) {
        super.update(obj);
        const {
            file = '',
        } = obj;
    }
}