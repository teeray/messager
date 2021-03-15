import { HIDC } from "../base/hidc";

export class IdentityUser{
    id:string = '';
    userName:string = '';
    constructor(obj: IdentityUser = {} as IdentityUser){
      const {
        id = '',
        userName = '',
        } = obj;
        this.id = id;
        this.userName = userName;
    } 
    update(obj: IdentityUser = {} as IdentityUser){
      const {
        id = '',
        userName = ''
        } = obj;
        this.id = id;

    }
}