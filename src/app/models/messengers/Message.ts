import { HIDC } from "../base/hidc";

export class Message extends HIDC {
    poolID: number = -1;
    text: string = '';
    fromAuth:string = ''
    constructor(obj: Message = {} as Message) {
        super(obj);
        const {
            poolID = 0,
            text = '',
            fromAuth = ''
        } = obj;
        this.poolID = poolID;
        this.text = text;
        this.fromAuth = fromAuth;
    }
    update(obj: Message = {} as Message) {
        super.update(obj);
        const {
            poolID = 0,
            text = '',
            fromAuth = ''
        } = obj;
        this.poolID = poolID;
    }
}