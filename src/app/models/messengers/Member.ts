import { HIDC } from "../base/hidc";

export class Member extends HIDC {
    poolID: number = -1;
    authID: string = '';
    constructor(obj: Member = {} as Member) {
        super(obj);
        const {
            poolID = 0,
            authID = '',
        } = obj;
        this.poolID = poolID;
        this.authID = authID;
    }
    update(obj: Member = {} as Member) {
        super.update(obj);
        const {
            poolID = 0,
            authID = '',
        } = obj;
        this.poolID = poolID;
    }
}